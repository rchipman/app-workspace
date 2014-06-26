# EM Namespace

class EM

  unit: null
  class unitMaker
    class PrivateUnit
      constructor: -> return {}
    @get: -> new PrivateUnit()

  getUnit: ->
    @unit ?= unitMaker.get()

  clone: (obj) ->
    if not obj? or typeof obj isnt 'object'
      return obj

    if obj instanceof Date
      return new Date(obj.getTime())

    if obj instanceof RegExp
      flags = ''
      flags += 'g' if obj.global?
      flags += 'i' if obj.ignoreCase?
      flags += 'm' if obj.multiline?
      flags += 'y' if obj.sticky?
      return new RegExp(obj.source, flags)

    newInstance = new obj.constructor()

    for key of obj
      newInstance[key] = EM::clone(obj[key])

    return newInstance

  identity: (x) -> x

  toController: (str) ->
      console.log str
      "#{str[..0].toUpperCase()}#{str[1..]}"

em = new EM
em.getUnit()
