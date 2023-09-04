"use client";
import ReduxProvider from "@/store/ReduxProvider";
import BurgerButton from "./BurgerButton";

const MobileMenu = () => {
    return (
        <ReduxProvider>
            <BurgerButton />
        </ReduxProvider>
    )
}

export default MobileMenu

