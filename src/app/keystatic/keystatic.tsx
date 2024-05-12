'use client';

import { makePage } from '@keystatic/next/ui/app';
import config from '../../../keystatic.config';
if (typeof window !== undefined){
    localStorage.theme = 'light';
    }
export default makePage(config);
