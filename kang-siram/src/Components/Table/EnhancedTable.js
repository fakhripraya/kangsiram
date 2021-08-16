import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import LandAddresses from '../../Data/LandAddresses';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const upperHeadCells = [
    { id: 'check', sort: false, disablePadding: true, label: 'Check' },
    { id: 'emoty', sort: true, disablePadding: false, label: '' },
    { id: 'empty2', sort: false, disablePadding: false, label: 'Pakpres: 0xf0F16b80Ff38F882dD5b3C0Ed6ec4e06774324D7 | Aphrogame: 0xc3B04a735c5cDea8e19e9858d9E4D916B14605c2 | Altergogi: 0xede11088f435e293574fe87ac254004f0c7a41aa' },
];

const headCells = [
    { id: 'number', sort: false, disablePadding: true, label: 'No' },
    { id: 'name', sort: true, disablePadding: false, label: 'Address ID' },
    { id: 'action', sort: false, disablePadding: false, label: 'Action' },
];

function EnhancedTableRow(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;

    return (
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                />
            </TableCell>
            {headCells.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align='center'
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    {headCell.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

EnhancedTableRow.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();

    return (
        <Toolbar
            className={clsx(classes.root)}
        >
            <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
                Plot Addresses
            </Typography>
            <Tooltip title="It will ease your search, trust me">
                <Button fullWidth variant="contained" color="primary">
                    Middle click on the "Go" button to ease your search
                </Button>
            </Tooltip>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableRow: {
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.grey[100],
        }
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('no');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rows, setRows] = React.useState([])
    const [rowsPerPage, setRowsPerPage] = React.useState(rows.length);

    const handleSelect = useCallback((name) => {
        var arr = [...selected]
        var temp = arr.indexOf(name);
        if (temp === -1) {
            arr.push(name)
        } else {
            arr.splice(temp, 1);
        }

        setSelected(arr);
    }, [selected]);

    useEffect(() => {
        const getRows = LandAddresses(handleSelect);
        setRows(getRows)
    }, [handleSelect])

    if (rows.length === 0) {
        return (
            <div className={classes.root}>
                <CircularProgress color="secondary" />
            </div>
        )
    } else {
        const handleRequestSort = (event, property) => {
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        };

        const handleSelectAllClick = (event) => {
            if (event.target.checked) {
                const newSelecteds = rows.map((n) => n.name);
                setSelected(newSelecteds);
                return;
            }
            setSelected([]);
        };

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        const handleChangeDense = (event) => {
            setDense(event.target.checked);
        };

        const isSelected = (name) => selected.indexOf(name) !== -1;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <TableHead className={classes.tableHead}>
                                <TableRow>
                                    {upperHeadCells.map((headCell) => (
                                        <TableCell
                                            key={headCell.id}
                                            align='center'
                                            padding='normal'
                                            sortDirection={orderBy === headCell.id ? order : false}
                                        >
                                            {headCell.label}
                                        </TableCell>
                                    ))}
                                    <TableCell
                                        align='right'
                                        padding='normal'
                                    >
                                        <FormControlLabel
                                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                                            label="Dense padding"
                                        />
                                    </TableCell>
                                </TableRow>
                                <EnhancedTableRow
                                    classes={classes}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                />
                            </TableHead>
                            <TableBody>
                                {rows
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                className={classes.tableRow}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.name}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onChange={() => { handleSelect(row.name) }}
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell onClick={() => handleSelect(row.name)} align="center">{row.number}</TableCell>
                                                <TableCell onClick={() => handleSelect(row.name)} align="center">{row.name}</TableCell>
                                                <TableCell align="center">{row.action}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[rows.length]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        );
    }
}
