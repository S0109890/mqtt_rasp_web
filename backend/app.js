const express = require('express')
const path = require('path')
const morgan = require('morgan')

const { sequelize }  = require('./models')
const cors = require('cors');
const corsConfig = require('./config/corsConfig.json');
var cookieParser = require('cookie-parser');
const logger = require('./lib/logger')
const bodyParser = require('body-parser')
const models = require('./models/index')
const indexRouter = require('./routes')
const usersRouter = require('./routes/users')

const app = express()

//view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')
app.set('port',process.env.PORT || 3001)

logger.info('app start')

//DB연결 확인 및 table생성
sequelize.sync({force: false})
  .then(()=> {
    console.log('데이터베이스 연결 성공')
  })
  .catch(err => {
    console.error(err)
  }) 

models.sequelize.authenticate().then(()=>{
  logger.info('DB connection success')

  //sequelize sync (table 생성)
  models.sequelize.sync().then(()=>{
    logger.info('Sequelize sync success')
  }).catch((err)=>{
    logger.error('DB Connection fail', err)
  })
})
// const {sequelize} = require('./models')




app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors(corsConfig));

// app.use('/', indexRouter)
// app.use('/users', usersRouter)

app.use((req,res,next)=>{
  const error = new Error(`${req.method}${req.url} 라우터가 없습니다`)
  error.status = 404
  next(error)
})

app.use((err,req,res,next)=>{
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !=='production' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

app.listen(app.get('port'),()=>{
  console.log(app.get('port'),'번 포트에서 대기중');
})
