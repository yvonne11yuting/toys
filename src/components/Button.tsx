import { MouseEventHandler } from "react";
import Image from 'next/image';

interface ButtonProps {
    title: string;
    leftIcon?: string | null;
    rightIcon?: string | null;
    handleClick?: MouseEventHandler;
    isSubmitting?: boolean;
    type?: 'button' | 'submit';
    bgColor?: string;
    textColor?: string;
}

const Button = ({
    title,
    leftIcon,
    rightIcon,
    handleClick,
    isSubmitting,
    type,
    bgColor = 'bg-primary-purple',
    textColor = 'text-white'
}: ButtonProps) => {
    let btnColor = isSubmitting ? 'bg-block/50' : bgColor;
    return (
        <button
            type={type || 'button'}
            disabled={isSubmitting}
            className={`flexCenter gap-3 px-4 py-3 ${textColor} ${btnColor} rounded-xl text-sm font-medium max-md:w-full`}
            onClick={handleClick}
        >
            {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
            {title}
            {rightIcon && <Image src={rightIcon} width={14} height={14} alt="left" />}

        </button>
    )
}

export default Button