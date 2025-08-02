'use client'
import Image from 'next/image'
import React from 'react'
import { getDatabase, ref, set } from "firebase/database";
import { app } from '@/app/firebaseConnect';
import { useRouter } from 'next/navigation';
function Button() {
    const getDB = getDatabase(app)
    const route = useRouter()

    function writeUserData() {
        set(ref(getDB, 'users/Ajeet'), {
            id: 1,
            username: "Ajeet Singh",
            email: "ajeet@yopmail.com",
            age: 25
        });
    }

    return (
        <div>
            <button
            className='btn text-light'
            onClick={() => writeUserData()}
        >
            <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
            />
            <span className='ms-1'>Save to DB →</span>
        </button>
        <button
            className='btn text-light'
            onClick={() => route.push("/SignupPage")}
        >
            <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
            />
            <span className='ms-1'>Go TO LogIn/SignUp →</span>
        </button>
        </div>
    )
}

export default Button