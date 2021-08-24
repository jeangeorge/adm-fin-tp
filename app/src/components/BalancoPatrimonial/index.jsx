import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "date-fns";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const hardcodedData = {
  empresa: "GLOBAL CORPORATION",
  moeda: "US$",
  quantidade: "milhões",
  exercicios: [2007, 2006],
  linhas: [
    {
      section: "section1",
      valores: [
        ["Caixa", 23.2, 19.5, "Contas a pagar", 29.2, 26.5],
        [
          "Contas a receber",
          18.5,
          13.2,
          "Títulos a pagar/Dívidas de curto prazo",
          5.5,
          3.2,
        ],
        ["Estoques", 15.3, 14.3, "", "", ""],
      ],
    },
    {
      section: "section2",
      valores: [
        [
          "Propriedades, instalações e equipamentos líquidos",
          113.1,
          80.9,
          "Dívidas de longo prazo",
          113.2,
          78.0,
        ],
      ],
    },
  ],
};

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TableCellNoBorder = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

export default function SpanningTable() {
  const classes = useStyles();
  const data = hardcodedData;
  const [company, setCompany] = useState("GLOBAL CORPORATION");

  const currencies = ["US$", "€", "฿", "¥", "R$"];
  const [currency, setCurrency] = useState("US$");

  const units = ["centenas", "milhares", "milhões", "bilhões", "trilhões"];
  const [unit, setUnit] = useState("milhões");

  const [initialYear, setInitialYear] = useState(new Date().getFullYear());
  const [finalYear, setFinalYear] = useState(new Date().getFullYear() - 1);

  const [years, setYears] = useState([2021, 2020]);

  useEffect(() => {
    const newYears = [];
    if (initialYear > finalYear) {
      for (let i = initialYear; i >= finalYear; i--) {
        newYears.push(i);
      }
    } else {
      for (let i = initialYear; i <= finalYear; i++) {
        newYears.push(i);
      }
    }
    console.log(newYears);
    setYears(newYears);
  }, [initialYear, finalYear]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField
            id="company"
            label="Empresa"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="standard-select-currency"
            select
            label="Moeda"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            fullWidth
          >
            {currencies.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="standard-select-currency"
            select
            label="Unidade"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            fullWidth
          >
            {units.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              disableToolbar
              variant="inline"
              format="yyyy"
              margin="normal"
              id="initial-yar"
              label="Exercício Inicial"
              value={new Date(initialYear + "-01-10")}
              onChange={(year) => setInitialYear(year.getFullYear())}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              margin="normal"
              id="final-year"
              label="Exercício Final"
              format="yyyy"
              value={new Date(finalYear + "-01-10")}
              onChange={(year) => setFinalYear(year.getFullYear())}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <br></br>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2 * years.length + 2}>
                <b>{company}</b>
                <br />
                <b>Balanço Patrimonial</b>
                <br />
                <b>
                  Exercício terminado em 31 de dezembro (em {currency} {unit})
                </b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <b>Ativos</b>
              </TableCell>

              {years.map((exercicio) => (
                <TableCell key={`ativo-${exercicio}`} align="right">
                  <b>{exercicio}</b>
                </TableCell>
              ))}

              <TableCell align="left">
                <b>Passivos e patrimônio líquido</b>
              </TableCell>

              {years.map((exercicio) => (
                <TableCell key={`ativo-${exercicio}`} align="right">
                  <b>{exercicio}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCellNoBorder colSpan={years.length + 1}>
                <u>Ativo circulante</u>
              </TableCellNoBorder>
              <TableCellNoBorder colSpan={years.length + 1}>
                <u>Exigíveis a curto prazo</u>
              </TableCellNoBorder>
            </TableRow>
            {data.linhas[0].valores.map((linha) => (
              <TableRow key={linha}>
                {linha.map((valor) => (
                  <TableCellNoBorder
                    align={isNaN(valor) ? "left" : "right"}
                    key={valor}
                  >
                    {valor}
                  </TableCellNoBorder>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCellNoBorder>Total ativo circulante</TableCellNoBorder>
              {/* TODO: CALCULAR TOTAIS DO ATIVO CIRCULANTE */}
              {years.map((exercicio) => (
                <TableCellNoBorder
                  key={`total-ativo-circulante-${exercicio}`}
                  align="right"
                >
                  0
                </TableCellNoBorder>
              ))}
              <TableCellNoBorder>Total passivo circulante</TableCellNoBorder>
              {/* TODO: CALCULAR TOTAIS DO PASSIVO CIRCULANTE */}
              {years.map((exercicio) => (
                <TableCellNoBorder
                  key={`total-passivo-circulante-${exercicio}`}
                  align="right"
                >
                  0
                </TableCellNoBorder>
              ))}
            </TableRow>
            <TableRow>
              <TableCellNoBorder colSpan={years.length + 1}>
                <u>Ativos realizáveis a longo prazo</u>
              </TableCellNoBorder>
              <TableCellNoBorder colSpan={years.length + 1}>
                <u>Elegíveis a longo prazo</u>
              </TableCellNoBorder>
            </TableRow>
            {data.linhas[1].valores.map((linha) => (
              <TableRow key={linha}>
                {linha.map((valor) => (
                  <TableCellNoBorder
                    align={isNaN(valor) ? "left" : "right"}
                    key={valor}
                  >
                    {valor}
                  </TableCellNoBorder>
                ))}
              </TableRow>
            ))}
            {/* TODO: CALCULAR TOTAIS DOS ATIVOS REALIZAVEIS A LP*/}
            <TableCellNoBorder>
              Total dos ativos realizáveis a longo prazo
            </TableCellNoBorder>
            {years.map((exercicio) => (
              <TableCellNoBorder
                key={`total-ativo-realizavel-lp-${exercicio}`}
                align="right"
              >
                0
              </TableCellNoBorder>
            ))}
            <TableCellNoBorder>
              Total de exigíveis a longo prazo
            </TableCellNoBorder>
            {/* TODO: CALCULAR TOTAIS DE EXIGÍVEIS A LP */}
            {years.map((exercicio) => (
              <TableCellNoBorder
                key={`total-exigiveis-lp-${exercicio}`}
                align="right"
              >
                0
              </TableCellNoBorder>
            ))}
            <TableRow>
              <TableCellNoBorder></TableCellNoBorder>
              {years.map((exercicio) => (
                <TableCellNoBorder
                  key={`ativos-vazios-${exercicio}`}
                  align="right"
                ></TableCellNoBorder>
              ))}
              <TableCellNoBorder>
                <b>Passivos totais</b>
              </TableCellNoBorder>
              {/* TODO: CALCULAR PASSIVOS TOTAIS */}
              {years.map((exercicio) => (
                <TableCellNoBorder
                  key={`ativos-vazios-${exercicio}`}
                  align="right"
                >
                  <b>0</b>
                </TableCellNoBorder>
              ))}
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              {years.map((exercicio) => (
                <TableCell
                  key={`ativos-vazios-${exercicio}`}
                  align="right"
                ></TableCell>
              ))}
              <TableCell>
                <b>Patrimônio líquido</b>
              </TableCell>
              {/* TODO: CALCULAR PATRIMONIO LIQUIDO */}
              {years.map((exercicio) => (
                <TableCell
                  key={`patrimonio-liquido-${exercicio}`}
                  align="right"
                >
                  <b>0</b>
                </TableCell>
              ))}
            </TableRow>
            {/* CALCULAR TOTAL ATIVOS E  PASSIVOS TOTAIS + PL*/}
            <TableRow>
              <TableCell>
                <b>Ativos totais</b>
              </TableCell>
              {years.map((exercicio) => (
                <TableCell key={`ativos-totais-${exercicio}`} align="right">
                  <b>0</b>
                </TableCell>
              ))}
              <TableCell>
                <b>Passivos totais e patrimônio líquido</b>
              </TableCell>
              {years.map((exercicio) => (
                <TableCell key={`ativos-totais-${exercicio}`} align="right">
                  <b>0</b>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}