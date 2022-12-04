import { NextFunction, Request, Response } from 'express';

interface Param {
  param_key: string;
  required: boolean;
  type: string;
}

export const validateRequest = (requestParams: Param[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (let param of requestParams) {
      if (checkParamPresent(Object.keys(req.body), param)) {
        let reqParam = req.body[param.param_key];
        if (!checkParamType(reqParam, param)) {
          return res.status(400).json({
            result:
              `${param.param_key} is of type ` +
              `${typeof reqParam} but should be ${param.type}`,
          });
        }
      } else if (param.required) {
        return res.status(400).json({
          result: `Missing parameter ${param.param_key}`,
        });
      }
    }
    next();
  };
};

const checkParamPresent = (reqParams: string[], paramObj: Param) => {
  return reqParams.includes(paramObj.param_key);
};

const checkParamType = (reqParam: any, paramObj: Param) => {
  const reqParamType = typeof reqParam;
  return reqParamType === paramObj.type;
};
