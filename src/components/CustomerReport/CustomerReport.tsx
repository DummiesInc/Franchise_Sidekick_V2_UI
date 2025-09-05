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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <h5
          style={{
            fontWeight: 'bold'
          }}
        >
          Franchise Report
        </h5>
        <p>Here are a list of franchises tailored to your investment needs</p>
      </div>
      <PDFViewer
        style={{
          height: '700px',
          width: isMobile ? '400px' : '700px'
        }}
        showToolbar={false}
      >
        <FranchiseReportPDF franchiseReport={franchiseReport} />
      </PDFViewer>
    </div>
  );
};

export default CustomerReport;
