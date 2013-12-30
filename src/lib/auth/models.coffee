fs = require "fs"
mongoose = require 'mongoose'
crypto = require 'crypto'

Schema = mongoose.Schema
ObjectId = Schema.ObjectId

User = new Schema

  firstName:
    type: String
    required: true

  lastName:
    type: String
    required: true

  email:
    type: String
    required: true
    index:
      unique: true

  username:
    type: String
    required: true
    index:
      unique: true

  active:
    type: Boolean
    default: true

  hashedPassword: String
  salt: String


User
  .virtual('password')
  .set (password) ->
    @_password = password
    @salt = @makeSalt()
    @hashed_password = @encryptPassword(password)
  .get () ->
    @_password


User
  .method 'makeSalt', () ->
    Math.round((new Date().valueOf() * Math.random())) + ''


User
  .method 'encryptPassword', (password) ->
    crypto.createHmac('sha1', @salt).update(password).digest('hex')


User
  .method 'authenticate', (plainText) ->
    return @encryptPassword(plainText) == @hashed_password


module.exports.User = mongoose.model 'User', User

# User.path('image').set (new_value) ->
#   if new_value isnt @image
#     if @image isnt 'default_user.png'
#       console.log "delete user avatar on change: "
#       @deleteAvatars(@image)
#   return new_value




# User
#   .method 'filter', () ->
#     filtered_user = _.omit(@_doc, ['salt', 'hashed_password', 'provider', 'apn_token'])
#     filtered_user.image = "#{config.media_url}/#{@_doc.image}"
#     return filtered_user

# User.post 'remove', (doc) ->
#   if doc.image isnt 'default_user.png'
#     console.log "delete user avatar on remove: "
#     @deleteAvatars(doc.image)

# User
#   .method 'deleteAvatars', (avatar) ->
#     generate2xname = (path) ->
#       name = path.substr 0, path.lastIndexOf('.')
#       extension = path.substr path.lastIndexOf('.')
#       extension = "@2x#{extension}"
#       return "#{name}#{extension}"

#     fs.unlink "#{config.media_root}/#{avatar}", (err) ->
#       if err then console.error "ERROR deleting user's avatar: ", err
#       else console.log "User's avatar deleted successfully!"
#     fs.unlink "#{config.media_root}/#{generate2xname(avatar)}", (err) ->
#       if err then console.error "ERROR deleting user's avatar: ", err
#       else console.log "User's avatar deleted successfully!"
