//subscribe
const options = {
  host: '172.20.10.11',
  port: 1883,
  protocol: 'mqtt',
  username: 'sm',
  password: '123'
}
const client = mqtt.connect(options)
const mqtt = require('mqtt')
const topic = 'rasp'

console.log('topic : rasp')

//연결확인 함수 connect
const mqttConnectionCheck = (req, res, next) => {
  client.on('connect', () => {
    console.log('connected')
    next()
  })
  client.on('error', err => {
    console.error(err)
    next(err)
    client.end()
  })
}

//연결되었다면
//구독함수
const mqttSubs = (req, res, next) => {
  client.on('connect', () => {
    console.log('connected')
    next()
  })
  client.subscribe(topic)
  client.on('message', (topic, message, packet) => {
    console.log(`topic:${topic} message is ` + message)
  })

  //publish함수
  const dataPublish = setInterval(() => {
    const json = {
      msg: 'hi'
    }
    client.publish('rasp', JSON.stringify(json))
  }, 1000)

  client.on('message', (topic, message, packet) => {
    console.log('message is ' + message)
    console.log('topic is ' + topic)
  })

  //에러처리함수
  client.on('error', err => {
    console.error(err)
    next(err)
    client.end()
  })
}

module.exports = { mqttConnectionCheck, mqttSubs }
