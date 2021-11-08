import React from 'react'
import { createAccount } from './CreateAccount.telefunc'
import { TextInputForm } from '../utils/TextInputForm'
import { User } from '../../../db/User'

export { CreateAccount }

function CreateAccount({ onNewAccount }: { onNewAccount: (userList: User[]) => void }) {
  return (
    <TextInputForm
      onSubmit={async (text: string) => {
        const name = text
        const userList = await createAccount(name)
        onNewAccount(userList)
      }}
      submitButtonText="Create Account"
    />
  )
}
