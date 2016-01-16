# Sphero-Auto-Pilot

迷路用に改変した、Sphero-Auto-Pilot。  
本家は[こちら](https://github.com/yammmt/Sphero-Auto-Pilot)。  
シンプルバージョンは[こちら](https://github.com/shundroid/Sphero-Auto-Pilot/tree/simple)。

## About

※`○○`関数はmain.js内の関数とします。
1. ひたすら前進します。(`roll`関数にて)
2. ぶつかったときの2回に1回（コースの都合上）、時計回りに270°回転(`changeDegree`関数)します。そして1に戻ります。(`collision`関数にて)
3. ただし、5秒間ぶつからなければ(2回に1回でなくても)、~~180°~~270°回転(`changeDegree`関数)します。(`collision`関数にて)

- ゴールしたなどの判定は**人力**です。Spheroで計測する方法はないので・・
  gキーを押すとゴールしたということにし、接続されてからの経過時間を`console.log`します。(`keyPress`関数にて)

- 基本的な機能は以上です。わかりやすいように、ぶつかったときにSpheroの色を0.25秒かえたり、`console.log`出力したりしています。

## File

- Spheroの設定やスピードなどのチート系: config.jsで設定
- バッテリー情報を取得する（バッテリー少ないから）: powerState.js
- 接続されてからの時間を取得する: timer.js
- `Keypress`の初期化など: keypressManager.js
- それらをまとめる: main.js

___

## Quick start

- モジュールをインストール

```bash
npm install
```

- config.jsを編集

`serialPort`のみの変更で動くはず。

```js
  serialPort: "COM4",
```
Spheroのシリアルポートにしておく。
シリアルポートの取得は[こちら](https://github.com/comozilla/Sphero-wakuwaku/wiki/%E7%92%B0%E5%A2%83%E8%A8%AD%E5%AE%9A)を参照。

---

## License
[MIT License](http://wisdommingle.com/mit-license/)
