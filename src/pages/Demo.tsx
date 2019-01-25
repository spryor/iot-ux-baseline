import * as React from 'react';
import { I18n } from '../i18n';

import { Database } from './Database';
import { FluentGrid } from './Grid';
import { Button } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Button';

const columnDefs = [
  {
    label: 'First name',
    field: 'firstName'
  },
  {
    label: 'Second name',
    field: 'lastName'
  },
  {
    label: 'Grade',
    field: 'grade',
    width: 90
  },
  {
    label: 'Status',
    field: 'status'
  }
];

export const Demo = () => (
  <I18n>{loc =>
    <DemoContents />
  }</I18n>
);

const pageSize: number = 20;
const numItems = 1000000;
const numPageBtns = 5;

class DemoContents extends React.Component<any, any, any> {

  public state: any;
  private fakeService: Database;

  constructor(props: any) {
    super(props);

    this.state = {
      data: [],
      currentPage: 0,
      isLoading: false
    };

    this.fakeService = new Database(numItems);
  }

  componentDidMount() {
    this.requestPage(this.state.currentPage)();
  }

  requestPage = (pageNum: number) => () => {
    this.setState({ isLoading: true });
    this.fakeService.request(pageNum * pageSize, pageSize, 500 * Math.random()).then(data => {
      this.setState({ data, currentPage: pageNum, isLoading: false });
    });
  };

  render() {

    const gridProps = {
      data: this.state.data,
      columnDefs
    };

    const numPages = Math.ceil(numItems / pageSize);

    return (
      <>
        <h1>Demo { this.state.isLoading ? '...loading' : '' }</h1>
        <Pagination
          currentPage={this.state.currentPage}
          numPages={numPages}
          numBtns={numPageBtns}
          onPageChange={this.requestPage} />
        <FluentGrid {...gridProps} />
      </>
    );
  }

}

interface PaginationProps {
  currentPage: number,
  numPages: number,
  numBtns: number,
  onPageChange: (pageNum: number) => () => void
}

const Pagination = (props: PaginationProps) => {
  if (props.numPages < 2) return null;

  const btns: JSX.Element[] = [];
  const previousPage = props.currentPage - 1;
  const nextPage = props.currentPage + 1;

  btns.push(
    <Button
      onClick={props.onPageChange(0)}
      disabled={0 === props.currentPage}
      key={'firstPage'}>First</Button>
  );
  btns.push(
    <Button
      onClick={props.onPageChange(previousPage)}
      disabled={previousPage < 0}
      key={'previousPage'}>Prev</Button>
  );

  let startPageBtn = Math.max(props.currentPage - Math.floor(props.numBtns / 2), 0);
  let endPageBtn = Math.min(startPageBtn + props.numBtns, props.numPages);

  if (startPageBtn > props.numPages - props.numBtns) {
    startPageBtn = Math.max(props.numPages - props.numBtns, 0);
  }

  for (let pageNum = startPageBtn; pageNum < endPageBtn; pageNum++) {
    btns.push(
      <Button
        onClick={props.onPageChange(pageNum)}
        disabled={pageNum === props.currentPage}
        key={pageNum}>{pageNum + 1}</Button>
    );
  }

  btns.push(
    <Button
      onClick={props.onPageChange(nextPage)}
      disabled={nextPage >= props.numPages}
      key={'nextPage'}>Next</Button>
  );
  btns.push(
    <Button
      onClick={props.onPageChange(props.numPages - 1)}
      disabled={props.numPages - 1 === props.currentPage}
      key={'lastPage'}>Last</Button>
  );

  return (
    <>{ btns }</>
  );
}
