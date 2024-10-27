"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./toast-component.module.css";

interface ToastData {
    id: string;
    img: string;
    title: string;
    body: string;
    timeAgo: string;
}

interface ToastComponentProps {
    values: {
        message: ToastData[];
        toastEvery: number;
        toastDuration: number;
        waitFor: number;
    };
}

export const ToastComponent: React.FC<ToastComponentProps> = ({ values }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeToasts, setActiveToasts] = useState<ToastData[]>([]);

    useEffect(() => {
        const {
            message: messages,
            toastEvery,
            toastDuration,
            waitFor,
        } = values;

        const showToasts = () => {
            let delay = 0;
            messages.forEach((message: ToastData) => {
                setTimeout(() => {
                    setActiveToasts((prev) => [...prev, message]);
                    setTimeout(() => {
                        setActiveToasts((prev) =>
                            prev.filter((toast) => toast.id !== message.id),
                        );
                    }, toastDuration);
                }, delay);
                delay += toastEvery;
            });
        };

        const timer = setTimeout(showToasts, waitFor);

        return () => {
            clearTimeout(timer);
        };
    }, [values]);

    useEffect(() => {
        if (containerRef.current) {
            const toasts = containerRef.current.querySelectorAll(
                `.${styles.toast}`,
            );
            let cumulativeHeight = 0;
            toasts.forEach((toast) => {
                (toast as HTMLElement).style.transform =
                    `translateY(${cumulativeHeight}px)`;
                cumulativeHeight += (toast as HTMLElement).offsetHeight + 16;
            });
        }
    }, [activeToasts]);

    const handleToastClick = (id: string) => {
        setActiveToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <div ref={containerRef} className={styles.toastContainer}>
            {activeToasts.map((toast) => (
                <div
                    key={toast.id}
                    className={styles.toast}
                    onClick={() => handleToastClick(toast.id)}
                >
                    <div
                        className={styles.icon}
                        style={{ backgroundImage: `url('${toast.img}')` }}
                    ></div>
                    <div className={styles.details}>
                        <div className={styles.title}>{toast.title}</div>
                        <div>{toast.body}</div>
                    </div>
                    <div className={styles.timeAgo}>{toast.timeAgo}</div>
                </div>
            ))}
        </div>
    );
};
