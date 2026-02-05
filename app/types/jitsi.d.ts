/**
 * Jitsi Meet External API TypeScript Definitions
 * For use with https://meet.jit.si/external_api.js
 */

declare global {
  interface Window {
    JitsiMeetExternalAPI: typeof JitsiMeetExternalAPI
  }
}

export interface JitsiMeetOptions {
  roomName: string
  parentNode?: HTMLElement | null
  width?: string | number
  height?: string | number
  jwt?: string
  lang?: string
  userInfo?: {
    displayName?: string
    email?: string
    avatarURL?: string
  }
  configOverrides?: Partial<JitsiConfig>
  interfaceConfigOverrides?: Partial<JitsiInterfaceConfig>
  onload?: () => void
}

export interface JitsiConfig {
  startWithAudioMuted: boolean
  startWithVideoMuted: boolean
  prejoinPageEnabled: boolean
  disableDeepLinking: boolean
  disableInviteFunctions: boolean
  enableClosePage: boolean
  enableWelcomePage: boolean
  hideConferenceSubject: boolean
  hideConferenceTimer: boolean
  subject?: string
}

export interface JitsiInterfaceConfig {
  TOOLBAR_BUTTONS: string[]
  SHOW_JITSI_WATERMARK: boolean
  SHOW_WATERMARK_FOR_GUESTS: boolean
  SHOW_BRAND_WATERMARK: boolean
  BRAND_WATERMARK_LINK: string
  SHOW_POWERED_BY: boolean
  SHOW_PROMOTIONAL_CLOSE_PAGE: boolean
  DISABLE_JOIN_LEAVE_NOTIFICATIONS: boolean
  DISABLE_PRESENCE_STATUS: boolean
  DISABLE_FOCUS_INDICATOR: boolean
  DEFAULT_BACKGROUND: string
  DEFAULT_LOCAL_DISPLAY_NAME: string
  DEFAULT_REMOTE_DISPLAY_NAME: string
  filmStripOnly: boolean
  VERTICAL_FILMSTRIP: boolean
  CLOSE_PAGE_GUEST_HINT: boolean
  MOBILE_APP_PROMO: boolean
  HIDE_INVITE_MORE_HEADER: boolean
  HIDE_DEEP_LINKING_LOGO: boolean
  GENERATE_ROOMNAMES_ON_WELCOME_PAGE: boolean
  DISPLAY_WELCOME_PAGE_CONTENT: boolean
  DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: boolean
}

export interface JitsiParticipant {
  participantId: string
  displayName: string
  avatarURL?: string
}

export interface JitsiEventMap {
  'videoConferenceJoined': { roomName: string; id: string; displayName: string }
  'videoConferenceLeft': { roomName: string }
  'participantJoined': { id: string; displayName: string }
  'participantLeft': { id: string }
  'audioMuteStatusChanged': { muted: boolean }
  'videoMuteStatusChanged': { muted: boolean }
  'screenSharingStatusChanged': { on: boolean; details: unknown }
  'incomingMessage': { from: string; nick: string; message: string }
  'outgoingMessage': { message: string }
  'displayNameChange': { id: string; displayname: string }
  'readyToClose': void
  'subjectChange': { subject: string }
  'tileViewChanged': { enabled: boolean }
  'endpointTextMessageReceived': { senderInfo: { jid: string; displayName: string }; eventData: { text: string } }
}

export declare class JitsiMeetExternalAPI {
  constructor(domain: string, options?: JitsiMeetOptions)
  
  // Commands
  executeCommand(command: 'toggleAudio'): void
  executeCommand(command: 'toggleVideo'): void
  executeCommand(command: 'toggleShareScreen'): void
  executeCommand(command: 'toggleChat'): void
  executeCommand(command: 'toggleTileView'): void
  executeCommand(command: 'hangup'): void
  executeCommand(command: 'muteEveryone'): void
  executeCommand(command: 'sendEndpointTextMessage', to: string, text: string): void
  executeCommand(command: 'setTileView', enabled: boolean): void
  executeCommand(command: 'setVideoQuality', quality: number): void
  executeCommand(command: 'displayName', name: string): void
  executeCommand(command: 'avatarUrl', url: string): void
  executeCommand(command: 'email', email: string): void
  executeCommand(command: 'subject', subject: string): void
  executeCommand(command: string, ...args: unknown[]): void
  
  // Getters
  getNumberOfParticipants(): number
  getAvatarURL(participantId: string): string
  getDisplayName(participantId: string): string
  getEmail(participantId: string): string
  getIFrame(): HTMLIFrameElement
  getParticipantsInfo(): JitsiParticipant[]
  isVideoAvailable(): boolean
  isAudioAvailable(): boolean
  isAudioMuted(): Promise<boolean>
  isVideoMuted(): Promise<boolean>
  isDeviceChangeAvailable(): boolean
  isDeviceListAvailable(): boolean
  
  // Event Listeners
  addEventListener<K extends keyof JitsiEventMap>(
    event: K,
    listener: (data: JitsiEventMap[K]) => void
  ): void
  removeEventListener<K extends keyof JitsiEventMap>(
    event: K,
    listener: (data: JitsiEventMap[K]) => void
  ): void
  
  // Lifecycle
  dispose(): void
}

export {}
