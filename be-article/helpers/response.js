class _response {
    sendResponse = (res, data) => {
         try {
              if (data.code) {
                   res.status(data.code)

                   delete data.code

                   res.send(data)
                   return true
              }

              res.status(data && data.status ? 200:500)
              res.send(data)
         } catch (error) {
              console.log('sendResponse response helper Error', error)

              res.status(400).send({
                   status: false,
                   error
              })
         }
 
     }
     errorHandler = (err,req,res,next)=>{
          if(err.name === 'unauthorized'){
               // error jwt
               return res.status(401).send({
                    status:false,
                    error:'invalid token'
               })
          }
          // Default error handling
          return res.status(500).send({
               status:false,
               error:err.message
          })
     }
}

module.exports = new _response()