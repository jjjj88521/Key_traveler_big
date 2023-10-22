import { useState } from 'react'
import styles from '@/styles/user/member.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import UserLayout from '@/components/layout/user-layout'
import ResetPassword from '@/components/user/reset-password-form'
import Head from 'next/head'

export default function ForgetPassword() {
  return (
    <>
      <Head>
        <title>忘記密碼</title>
      </Head>
      <div className="container" style={{ height: 575 }}>
        <div className="row">
          <div className="col-12 col-sm-4 mt-5 offset-0 offset-sm-4">
            <ResetPassword />
          </div>
        </div>
      </div>
    </>
  )
}
