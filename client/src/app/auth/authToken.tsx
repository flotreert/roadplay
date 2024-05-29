'use client';
import React from 'react';
import { useState, useEffect } from "react";

export function AuthToken() {
    const [authToken, setAuthToken] = useState<string | null>(null);

    useEffect(() => {
        const token = window.localStorage.getItem("user");
        setAuthToken(token);
    }, []);

    return authToken;
}