import React from 'react'
import { Alert} from '@mui/material';

export default function Error({error,severity}) {
    return (
        <>
            <Alert severity={severity}>{error}</Alert>
        </>
    )
}
