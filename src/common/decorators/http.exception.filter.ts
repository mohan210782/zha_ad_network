
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
//import { Logger } from 'winston';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
   
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    
    //console.log("exception---",exception.stack);
    //console.log(nestjsMessage.stack)
    //this.logger.log("error","test", "test");
   
    let trace = exception.stack;
    let message = "";
    let name = exception.name;
    let status;
    
   
   //console.log(name)
    if (exception instanceof HttpException) {
       
      const exceptionResponse = JSON.parse( JSON.stringify(exception.getResponse()));
      status = exceptionResponse.status;
      message = exceptionResponse.error? exceptionResponse.error : exception.message;
      
     
    }else{
      //console.log(exception.message)
      message = exception.message;
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      
  
    }
    Logger.error(trace)
    let status1 =   
        exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
        status = status? status : status1;
  
    response.status(status).json({
      name: name,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      reason: message,
      trace : trace,
    });
  }
}