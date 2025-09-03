import React, { FC } from 'react';
import FranchiseReportPDF from '../ReactPDFs/FranchiseReportPDF';
import { GetCustomerFranchiseReportDto } from '@/src/endpoints';
import dynamic from 'next/dynamic';

interface Props {
  franchiseReport?: GetCustomerFranchiseReportDto | null;
}

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((m) => m.PDFViewer),
  { ssr: false }
);

const CustomerReport: FC<Props> = ({ franchiseReport }) => {
  return (
    <PDFViewer
      style={{
        height: '950px',
        width: '800px'
      }}
      showToolbar={false}
    >
      <FranchiseReportPDF franchiseReport={franchiseReport} />
    </PDFViewer>
  );
};

export default CustomerReport;
