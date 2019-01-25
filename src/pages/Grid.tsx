import React, { Component } from 'react';
import dot from 'dot-object';

import styles from './Grid.module.scss';

interface ColumnDef {
  label: string,
  field: string,
  width?: number
}

interface GridProps {
  data: any[],
  columnDefs: ColumnDef[],
  idField?: string,
  defaultColWidth?: number
}

interface GridState {
}

interface RowProps {
  children: any
}

const constants = {
  defaultIdField: 'id'
}

export class FluentGrid extends Component<GridProps, GridState> {
  render() {
    const {
      idField = constants.defaultIdField,
      columnDefs,
      data,
      defaultColWidth = 200
    } = this.props;

    return (
      <Grid>
        <HeaderRow>
          {
            columnDefs.map((colDef: ColumnDef, k: number) => {
              return (
                <Header width={colDef.width || defaultColWidth} key={colDef.field}>{colDef.label}</Header>
              );
            })
          }
        </HeaderRow>
        {
          data.map((rowData: any, i: number) =>
            <Row key={dot.pick(idField, rowData)}>
              {
                columnDefs.map((colDef: ColumnDef, k: number) => {
                  const content = dot.pick(colDef.field, rowData);
                  return (
                    <Cell width={colDef.width || defaultColWidth} key={k}>{content}</Cell>
                  );
                })
              }
            </Row>
          )
        }
      </Grid>
    );
  }
}

interface CellProps {
  width: number,
  children: any
}

export const Grid = (props: RowProps) => (
  <div className={styles.container} role="table">{ props.children }</div>
);

export const HeaderRow = (props: RowProps) => (
  <div className={styles.headerRow} role="row">{ props.children }</div>
);

export const Header = (props: CellProps) => (
  <div className={styles.headerCell} style={{ width: props.width }} role="cell">{ props.children }</div>
);

export const Row = (props: RowProps) => (
  <div className={styles.row} role="row">{ props.children }</div>
);

export const Cell = (props: CellProps) => (
  <div className={styles.cell} style={{ width: props.width }} role="cell">{ props.children }</div>
);
