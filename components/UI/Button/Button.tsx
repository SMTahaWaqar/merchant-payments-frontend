"use client";
import { Button as AntButton, ButtonProps } from "antd";
import clsx from "clsx";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost" | "subtle";

type CustomButtonProps = Omit<ButtonProps, "variant"> & { variant?: Variant };

export default function Button({
  className,
  variant = "subtle",
  icon,
  children,
  ...rest
}: CustomButtonProps) {
  const isIconOnly = !!icon && !children;
  return (
    <AntButton
      {...rest}
      className={clsx(
        styles.btn,
        styles[variant],
        isIconOnly && styles.iconOnly,
        className
      )}
      icon={icon}
    >
      {children}
    </AntButton>
  );
}
