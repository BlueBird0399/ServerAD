const {ONE_SIGNAL_CONFIG} = require('../config/app.config');
const pushNotificationService = require('../services/push-notification-services');

exports.SendNotification = (req, res, next) =>{ 
    var message = {
        app_id:ONE_SIGNAL_CONFIG.APP_ID,
        contents:{"en":"Testeo Notificacion Push"},
        included_segments:["Active Users", "Inactive Users"],
        content_available:true,
        small_icon:"ic_notification_icon",
        data:{
            PushTitle:"Custom Notification"
        },
    };

  

    pushNotificationService.SendNotification(message, (error, result) =>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message:"Success",
            data:result
        })
    });
}


exports.SendNotificationToDevice = (req, res, next) =>{ 
    var message = {
        app_id:ONE_SIGNAL_CONFIG.APP_ID,
        content:{"en":"Testeo Notificacion Push"},
        included_segments:["include_player_ids"],
        included_player_ids:req.body.devices,
        content_available:true,
        small_icon:"ic_notification_icon",
        data:{
            PushTitle:"Custom Notification"
        },
    };

    pushNotificationService.SendNotification(message, (error, result) =>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message:"Success",
            data:result
        });
    });
}

exports.getDeviceState = (req, res) =>{
    const options = {
        method: 'GET',
        headers: {Accept: 'text/plain', Authorization: "Basic "+ONE_SIGNAL_CONFIG.API_KEY}
      };
    const url = "https://"+ONE_SIGNAL_CONFIG.HOST+"/api/v1/players?app_id="+ ONE_SIGNAL_CONFIG.APP_ID;
    ///var https = require('https');
      var result = fetch(url, options)
    .then(res => res.json())
    .then(json => res.json(json))
    .catch(err => console.error('error:' + err));
}