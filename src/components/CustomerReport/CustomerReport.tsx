import React, { FC } from 'react';
import FranchiseReportPDF from '../ReactPDFs/FranchiseReportPDF';
import { GetCustomerFranchiseReportDto } from '@/src/endpoints';
import dynamic from 'next/dynamic';
import useIsMobile from '../utils/hooks/useIsMobile';

interface Props {
  franchiseReport?: GetCustomerFranchiseReportDto | null;
}

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((m) => m.PDFViewer),
  { ssr: false }
);

const CustomerReport: FC<Props> = ({ franchiseReport }) => {
  const isMobile = useIsMobile();
  return (
    <PDFViewer
      style={{
        height: '950px',
        width: isMobile ? '400px' : '700px'
      }}
      showToolbar={false}
    >
      <FranchiseReportPDF franchiseReport={franchiseReport} />
    </PDFViewer>
  );
};

export default CustomerReport;
