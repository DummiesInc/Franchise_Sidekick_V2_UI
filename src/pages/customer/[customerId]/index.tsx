import React from 'react';
import { GetServerSideProps } from 'next';
import endpoints, { GetCustomerFranchiseReportDto } from '@/src/endpoints';
import If from '@/src/components/utils/If';
import CustomerReport from '@/src/components/CustomerReport/CustomerReport';

interface Props {
  franchiseReport?: GetCustomerFranchiseReportDto | null;
}

const FranchiseReport = ({ franchiseReport }: Props) => {
  return (
    <div>
      <If
        condition={franchiseReport === undefined}
        then={
          <>
            <h5>The report you're looking for doesn't exist</h5>
            <p>Please head back to the main menu</p>
          </>
        }
        else={<CustomerReport franchiseReport={franchiseReport} />}
      />
    </div>
  );
};

export default FranchiseReport;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props: Props = {
    franchiseReport: null
  };

  const { customerId } = context.params!;

  try {
    const res = await endpoints.customer.customerFranchiseMatchReport({
      id: +customerId!
    });
    props.franchiseReport = res ?? null;

    return {
      props: props
    };
  } catch (err) {
    return {
      props: props
    };
  }
};
