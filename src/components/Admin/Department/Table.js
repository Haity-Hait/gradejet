import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import VerifyToken from '../../VerifyToken';
import Row from './Row';

export default function DepartmentTable() {
    const { verifyData } = VerifyToken();
    const [department, setDepartment] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "https://gradejet-backend.onrender.com/get/department",
                    {
                        schoolEmail: verifyData.email,
                    }
                );
                setDepartment(response.data.result);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message || 'An error occurred while fetching data.');
            }
        };

        fetchData();
    }, [verifyData.email]);
    console.log(department);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    {department.length > 0 && (
                        <TableRow>
                            <TableCell />
                            <TableCell>Department</TableCell>
                            <TableCell align="right">Courses</TableCell>
                        </TableRow>
                    )}
                </TableHead>
                <TableBody>
                    {department.length > 0 ? (
                        department.map((item) => (
                            <Row key={item.name} departmentName={item && item.name} courseTotal={item.courses.length} />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                {error || 'No departments found.'}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
