import { isUndefined, isNull } from 'lodash'
import {ErrorCodes} from '../config/Constants'

export const isRequired = value => {
  if (isUndefined(value) || isNull(value) || value === '') return ErrorCodes.EC_001
  return true
}

export const isEmail = value => {
  const emailRegExp = /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  if (!emailRegExp.test(value)) return ErrorCodes.EC_008
  return true
}

export const isNumber = value => {
  return !isNaN(value.toString())
}
