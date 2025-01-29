'use client';

import styles from "./headerLogout.module.css";

import { useRouter } from "next/navigation";

export const IconFeLogout = ({
    height = "40px",
    fill = "#677BFF",
    focusable = "false",
    ...props
  }) => (
    <svg
      role="img"
      cursor="pointer"
      style={{alignSelf: "center"}}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={height}
      focusable={focusable}
      {...props}
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M3 5c0-1.1.9-2 2-2h8v2H5v14h8v2H5c-1.1 0-2-.9-2-2zm14.176 6L14.64 8.464l1.414-1.414l4.95 4.95l-4.95 4.95l-1.414-1.414L17.176 13H10.59v-2z"
      />
    </svg>
);

export default function HeaderLogout() {
    const router = useRouter();

    function MouseOver(event){
        event.target.style.background = '#677BFF';
        const child = event.currentTarget.querySelector('a');
        if(child){
            child.style.color = 'white';
            child.style.background = '#677BFF';
        }
    }
    function MouseOut(event){
        event.target.style.background = '#F8F8F8';
        const child = event.currentTarget.querySelector('a');
        if(child){
            child.style.color = '#677BFF';
            child.style.background = '#F8F8F8';
        }
    }

    return (
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}/>
        <div className={styles.itemsContainer}>
            <div onClick={() => router.push("/")}
              style={{
                height: "100%", 
                display: "flex", 
                justifyContent: "center"}}>
              <IconFeLogout />
            </div>
        </div>
      </div>
    );
  }