import * as shared from 'alt-shared';

declare module 'alt-client' {
    interface ICustomEmitEvent {
        'crc-create-character-update-value': (data: Partial<shared.Appearance>) => void;
    }
}
