import { ref, onUnmounted, type Ref } from 'vue'
import type { JitsiMeetExternalAPI, JitsiMeetOptions, JitsiParticipant } from '~/types/jitsi'

interface UseJitsiMeetOptions {
  roomName: string
  displayName?: string
  onParticipantJoined?: (participant: { id: string; displayName: string }) => void
  onParticipantLeft?: (participant: { id: string }) => void
  onMeetingEnd?: () => void
}

interface JitsiState {
  isLoading: Ref<boolean>
  isJoined: Ref<boolean>
  isAudioMuted: Ref<boolean>
  isVideoMuted: Ref<boolean>
  isScreenSharing: Ref<boolean>
  participants: Ref<JitsiParticipant[]>
  error: Ref<string | null>
  loadingMessage: Ref<string>
}

interface JitsiActions {
  initMeet: (container: HTMLElement) => Promise<void>
  toggleAudio: () => void
  toggleVideo: () => void
  toggleScreenShare: () => void
  hangup: () => void
  dispose: () => void
}

const JITSI_DOMAIN = 'meet.jit.si'
const API_SCRIPT_URL = `https://${JITSI_DOMAIN}/external_api.js`
const SCRIPT_TIMEOUT = 15000
const JOIN_TIMEOUT = 30000

/**
 * Preload Jitsi script in the background (call from index page)
 */
export function preloadJitsiScript(): void {
  if (typeof window === 'undefined') return
  if ((window as any).JitsiMeetExternalAPI) return
  if (document.querySelector(`script[src="${API_SCRIPT_URL}"]`)) return
  
  const script = document.createElement('script')
  script.src = API_SCRIPT_URL
  script.async = true
  document.head.appendChild(script)
}

export function useJitsiMeet(options: UseJitsiMeetOptions): JitsiState & JitsiActions {
  let api: JitsiMeetExternalAPI | null = null
  let joinTimeoutId: ReturnType<typeof setTimeout> | null = null
  
  const isLoading = ref(true)
  const isJoined = ref(false)
  const isAudioMuted = ref(false)
  const isVideoMuted = ref(false)
  const isScreenSharing = ref(false)
  const participants = ref<JitsiParticipant[]>([])
  const error = ref<string | null>(null)
  const loadingMessage = ref('กำลังโหลด...')
  
  const loadJitsiScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if ((window as any).JitsiMeetExternalAPI) {
        resolve()
        return
      }
      
      const timeoutId = setTimeout(() => {
        reject(new Error('หมดเวลาโหลด - กรุณาลองใหม่'))
      }, SCRIPT_TIMEOUT)
      
      const existingScript = document.querySelector(`script[src="${API_SCRIPT_URL}"]`) as HTMLScriptElement
      if (existingScript) {
        const checkLoaded = setInterval(() => {
          if ((window as any).JitsiMeetExternalAPI) {
            clearInterval(checkLoaded)
            clearTimeout(timeoutId)
            resolve()
          }
        }, 100)
        return
      }
      
      const script = document.createElement('script')
      script.src = API_SCRIPT_URL
      script.async = true
      script.onload = () => {
        clearTimeout(timeoutId)
        resolve()
      }
      script.onerror = () => {
        clearTimeout(timeoutId)
        reject(new Error('ไม่สามารถโหลด Jitsi ได้'))
      }
      document.head.appendChild(script)
    })
  }
  
  const initMeet = async (container: HTMLElement): Promise<void> => {
    try {
      isLoading.value = true
      error.value = null
      loadingMessage.value = 'กำลังโหลด Jitsi...'
      
      await loadJitsiScript()
      
      loadingMessage.value = 'กำลังเชื่อมต่อห้องประชุม...'
      
      const jitsiOptions: JitsiMeetOptions = {
        roomName: `finlermeet-${options.roomName}`,
        parentNode: container,
        width: '100%',
        height: '100%',
        userInfo: {
          displayName: options.displayName || 'Guest'
        },
        configOverrides: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          prejoinPageEnabled: false,
          disableDeepLinking: true,
          disableInviteFunctions: false,
          enableClosePage: false,
          hideConferenceSubject: true,
          hideConferenceTimer: true
        },
        interfaceConfigOverrides: {
          TOOLBAR_BUTTONS: [],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_BRAND_WATERMARK: false,
          SHOW_POWERED_BY: false,
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
          filmStripOnly: false,
          VERTICAL_FILMSTRIP: true,
          MOBILE_APP_PROMO: false,
          HIDE_INVITE_MORE_HEADER: true,
          HIDE_DEEP_LINKING_LOGO: true
        }
      }
      
      api = new (window as any).JitsiMeetExternalAPI(JITSI_DOMAIN, jitsiOptions)
      
      joinTimeoutId = setTimeout(() => {
        if (!isJoined.value) {
          error.value = 'เชื่อมต่อ Meeting timeout - กรุณาลองใหม่'
          isLoading.value = false
          dispose()
        }
      }, JOIN_TIMEOUT)
      
      setupEventListeners()
      loadingMessage.value = 'กำลังเข้าร่วม Meeting...'
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'ไม่สามารถเชื่อมต่อได้'
      isLoading.value = false
    }
  }
  
  const setupEventListeners = () => {
    if (!api) return
    
    api.addEventListener('videoConferenceJoined', (data) => {
      if (joinTimeoutId) {
        clearTimeout(joinTimeoutId)
        joinTimeoutId = null
      }
      isJoined.value = true
      isLoading.value = false
    })
    
    api.addEventListener('videoConferenceLeft', () => {
      isJoined.value = false
      options.onMeetingEnd?.()
    })
    
    api.addEventListener('participantJoined', (data) => {
      participants.value = [...participants.value, {
        participantId: data.id,
        displayName: data.displayName
      }]
      options.onParticipantJoined?.(data)
    })
    
    api.addEventListener('participantLeft', (data) => {
      participants.value = participants.value.filter(p => p.participantId !== data.id)
      options.onParticipantLeft?.(data)
    })
    
    api.addEventListener('audioMuteStatusChanged', ({ muted }) => {
      isAudioMuted.value = muted
    })
    
    api.addEventListener('videoMuteStatusChanged', ({ muted }) => {
      isVideoMuted.value = muted
    })
    
    api.addEventListener('screenSharingStatusChanged', ({ on }) => {
      isScreenSharing.value = on
    })
    
    api.addEventListener('readyToClose', () => {
      dispose()
      options.onMeetingEnd?.()
    })
  }
  
  const toggleAudio = () => api?.executeCommand('toggleAudio')
  const toggleVideo = () => api?.executeCommand('toggleVideo')
  const toggleScreenShare = () => api?.executeCommand('toggleShareScreen')
  const hangup = () => api?.executeCommand('hangup')
  
  const dispose = () => {
    if (joinTimeoutId) {
      clearTimeout(joinTimeoutId)
      joinTimeoutId = null
    }
    if (api) {
      api.dispose()
      api = null
    }
    isJoined.value = false
    participants.value = []
  }
  
  onUnmounted(() => dispose())
  
  return {
    isLoading,
    isJoined,
    isAudioMuted,
    isVideoMuted,
    isScreenSharing,
    participants,
    error,
    loadingMessage,
    initMeet,
    toggleAudio,
    toggleVideo,
    toggleScreenShare,
    hangup,
    dispose
  }
}
