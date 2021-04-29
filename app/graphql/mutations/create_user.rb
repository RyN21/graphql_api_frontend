module Mutations
  class CreateUser < Mutations::BaseMutations
    argument :name, String, required: true
    argument :email, String, required: true
    argument :username, String, required: true

    field :user, Types::UserType, null: false
    field :errors, [String], null: false

    def resolve(name:, email:, username:)
      user = User.new(name: name, email: email, username: username)
      if user.save
        {
          user: user,
          errors: []
        }
      else
        {
          user: nil,
          errors: user.errors.full_messages
        }
    end
  end
end
