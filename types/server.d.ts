declare module 'alt-shared' {
    interface ICustomServerClientEvent {
        'crc-create-character-start': () => void;
        'crc-create-character-finish': () => void;
    }
}
