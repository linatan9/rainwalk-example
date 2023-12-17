import { RAINWALK_API_URL } from '@env';
import { apiHooks } from '@rainwalk/api';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import type { BillingStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/BillingStack';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import { Divider, Flex, Link, Text } from 'native-base';
import type { FunctionComponent } from 'react';
import React, { useMemo } from 'react';

interface PaymentRowProps {
  amount: number;
  date: Date;
  receiptUrl: string | null;
}
// TODO for testing purpose, remove after
const testReceiptURL =
  'https://s3.amazonaws.com/rainwalk.io/receipts/bde16835-d990-4591-95d2-ec5757d182d8.pdf';
const DEV = RAINWALK_API_URL.includes('dev.api');

const PaymentRow: React.FC<PaymentRowProps> = ({
  date,
  amount,
  receiptUrl,
}) => {
  const formattedDateItem = useMemo(() => {
    const formattedDate = date.toLocaleDateString();
    if (receiptUrl !== null || DEV) {
      const url = DEV ? testReceiptURL : receiptUrl;
      return (
        <Link
          _text={{
            color: 'rainwalkMidnightBlue.400',
            fontSize: 'xs',
            fontWeight: 'medium',
            textAlign: 'center',
          }}
          href={url ?? ''}
          isExternal
          isUnderlined
          w="3/5"
        >
          {formattedDate}&nbsp;&ndash;&nbsp;Receipt
        </Link>
      );
    }
    return (
      <Text
        fontSize={{ base: 'xs', sm: 'md' }}
        color="rainwalkDarkestBrown.400"
      >
        {formattedDate}
      </Text>
    );
  }, [date, receiptUrl]);
  return (
    <>
      <Flex direction="row" justifyContent="space-between">
        <Text
          fontWeight="bold"
          fontSize={{ base: 'sm', sm: 'md' }}
          color="rainwalkDarkestBrown.400"
        >
          Payment
        </Text>
        <Text color="rainwalkDarkestBrown.400">-${amount}</Text>
      </Flex>
      <Flex direction="row" justifyContent="space-between">
        {formattedDateItem}
        <Text color="rainwalkDarkestBrown.400">Processed</Text>
      </Flex>
      <Divider bg="rainwalkGray.400" mt={{ base: 3, sm: 4 }} />
    </>
  );
};

const PaymentRowsControlled = () => {
  const { data: { data: paymentHistory } = { data: [] } } = apiHooks.useGet(
    '/insured/payment/payment-history'
  );

  const paymentRows = useMemo(() => {
    return paymentHistory?.map((payment) => (
      <PaymentRow
        key={payment.policy_number}
        amount={payment.amount}
        date={payment.transaction_time}
        receiptUrl={payment.receipt_url}
      />
    ));
  }, [paymentHistory]);

  // TODO(cjshearer): use proper capitalization instead of all caps. Screen
  // readers will read this as an acronym, not as a word.
  return (
    <RainwalkCard title={{ text: 'PAYMENT HISTORY' }}>
      {paymentRows}
    </RainwalkCard>
  );
};

const PaymentHistory: FunctionComponent<
  BillingStackScreenProps<'PaymentHistory'>
> = () => (
  <ScreenLayout>
    <PaymentRowsControlled />
  </ScreenLayout>
);

export default PaymentHistory;
