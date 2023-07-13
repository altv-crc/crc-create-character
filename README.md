# [CRC][TS] Select Character

<sup>Supported by <a href="https://github.com/orgs/altv-crc/">CRC</a></sup>

Character creation menu that follows the character selection menu.

<img src="https://i.imgur.com/aZAoT1L.png" width="400" />

## Requires

- [CRC DB](https://github.com/altv-crc/crc-db)
- [CRC Instructional Buttons](https://github.com/altv-crc/crc-instructional-buttons)
- [CRC Native Menu](https://github.com/altv-crc/crc-native-menu)
- Login Plugin (Choose 1)
  - [CRC Dicord Login](https://github.com/altv-crc/crc-discord-login)
  - [CRC Login](https://github.com/altv-crc/crc-login)
- [CRC Appearance](https://github.com/altv-crc/crc-appearance)
- [CRC Preview Character](https://github.com/altv-crc/crc-preview-character)

_Highly recommended to get the extension, for better event handling._

## Installation

1. Create a folder in your `src` folder called `crc-create-character`.

2. Add the `TypeScript` files from this resource, to that folder.

3. Modify `server.toml` and ensure it loads whatever you named the folder.

In the case of the example above it should be `crc-create-character`.

```
resources = [ 
    'crc-db',
    'crc-native-menu',
    'crc-instructional-buttons',
    'crc-discord-login',
    'crc-create-character'
    'watch-resources'
]
```

_Your resource structure may vary_

## Developers

* Selection will immediately follow the login plugins.
* A selection event or creation event will be pushed after selection.

### Server Events

#### crc-create-character-finish

This is called after the `Appearance` data has been written to the Database.

```ts
alt.on('crc-create-character-finish', (player: alt.Player, _id: string) => {
    console.log(`Their MongoDB 'characters' document ID is ${_id}`);
})
```