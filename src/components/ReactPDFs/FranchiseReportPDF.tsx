import React, { FC } from 'react';
import {
  Page,
  View,
  Document,
  StyleSheet,
  Image,
  Text,
  Svg,
  Circle
} from '@react-pdf/renderer';
import dayjs from 'dayjs';
import { GetCustomerFranchiseReportDto } from '@/src/endpoints';
import If from '../utils/If';

interface Props {
  franchiseReport?: GetCustomerFranchiseReportDto | null;
}

const FranchiseReportPDF: FC<Props> = ({ franchiseReport }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          paddingTop: 30,
          paddingBottom: 30
        }}
      >
        <View style={styles.miniLogoWrapper}>
          <View style={styles.miniLogo}>
            <Image src={'/images/franchise-sidekick-logo.png'} />
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.textHeader}>{'Customer name:'}</Text>
            <Text>{franchiseReport?.customerName}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.textHeader}>{'Invest reason:'}</Text>
            <Text>{franchiseReport?.buyInReason}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.textHeader}>{'Goal:'}</Text>
            <Text>{franchiseReport?.vision}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.textHeader}>{'Availability:'}</Text>
            <Text>{franchiseReport?.involvement}</Text>
          </View>
        </View>

        <View
          style={{
            width: '100% ',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View style={styles.divider} />
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 2,
            marginTop: 10
          }}
        >
          {franchiseReport?.franchises?.map((franchise, i) => {
            return (
              <View
                key={i}
                style={{
                  gap: 4,
                  marginLeft: 20,
                  fontSize: 10,
                  fontWeight: 'thin'
                }}
              >
                <View
                  style={{
                    marginBottom: 20
                  }}
                >
                  <View style={[styles.textWrapper, { paddingBottom: 10 }]}>
                    <Text style={styles.textHeader}>{'Franchise:'}</Text>
                    <Text>{franchise?.name}</Text>
                  </View>

                  <If condition={!!franchise.brandReputation}>
                    <View style={styles.textWrapper}>
                      <Text style={styles.textHeader}>
                        {'Program Start Year:'}
                      </Text>
                      <Text>
                        {franchise?.brandReputation?.franchiseProgramYear}
                      </Text>
                    </View>

                    <View style={styles.textWrapper}>
                      <Text style={styles.textHeader}>
                        {'Units (Nationally):'}
                      </Text>
                      <Text>{`${franchise?.brandReputation?.totalUnits} locations`}</Text>
                    </View>

                    <View style={styles.textWrapper}>
                      <Text style={styles.textHeader}>
                        {'Satisfication Score:'}
                      </Text>
                      <Text>{`${franchise?.brandReputation?.satisfactionScore}/100`}</Text>
                    </View>
                  </If>

                  <If condition={!!franchise.operationInformation}>
                    <View style={styles.textWrapper}>
                      <Text style={styles.textHeader}>
                        {'Approved Supplier Only:'}
                      </Text>
                      <Text>
                        {franchise?.operationInformation?.approvedSupplierOnly
                          ? 'Yes'
                          : 'No'}
                      </Text>
                    </View>

                    <View style={styles.textWrapper}>
                      <Text style={styles.textHeader}>
                        {'Corporate Supplier Only:'}
                      </Text>
                      <Text>
                        {franchise?.operationInformation?.corporateSupplierOnly
                          ? 'Yes'
                          : 'No'}
                      </Text>
                    </View>

                    <View style={styles.textWrapper}>
                      <Text style={styles.textHeader}>
                        {'Staff Count Operation Requirement:'}
                      </Text>
                      <Text>{`${franchise?.operationInformation?.staffCountRequirement} staffs`}</Text>
                    </View>
                  </If>
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default FranchiseReportPDF;

const styles = StyleSheet.create({
  miniLogoWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  miniLogo: {
    height: '40px',
    width: '25%',
    marginBottom: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    // borderTop: 3, borderBottom: 3, borderLeft: 3,
    // borderRight: 3, borderColor: '#22618F', BorderStyle: 'solid'
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20,
    flexDirection: 'column',
    gap: 4,
    fontSize: 10,
    fontWeight: 'thin'
  },

  divider: {
    borderTop: 0.5,
    borderColor: '#fd5825',
    backgroundColor: '#fd5825',
    width: '90%',
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  textWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingTop: 2,
    paddingBottom: 1
  },

  textHeader: {
    fontSize: 10,
    fontWeight: 'bold'
  }
});
