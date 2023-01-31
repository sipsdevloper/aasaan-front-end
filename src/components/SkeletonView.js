import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export default function SkeletonView() {
    return (
        <>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={7}>
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={7}>
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={7}>
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
                    </TableCell>
                </TableRow>
            </TableBody>
        </>
    );
}
