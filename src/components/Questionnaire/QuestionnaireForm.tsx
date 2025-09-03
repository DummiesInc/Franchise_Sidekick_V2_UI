import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ReactTextInput } from '../ReactFormComponents/ReactTextInput';
import { SelectInput } from '../ReactFormComponents/SelectInput';
import { DatePickerInput } from '../ReactFormComponents/DatePickerInput';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { Involvement, Reason, Vision } from './questionnaireEnums';
import endpoints, { AddCustomerDto } from '@/src/endpoints';
import { SelectOption } from '../utils/selectOptions';

const buyInReasonOptions = [
  Reason.escapeFullTimeJob,
  Reason.expandPortfolio,
  Reason.passiveIncome,
  Reason.personalPassion
];

const visionOptions = [
  Vision.singleLocation,
  Vision.multiLocation,
  Vision.growthFocused,
  Vision.legacy
];

export const involvementOptions = [
  Involvement.fullTime,
  Involvement.partTime,
  Involvement.investor
];

const questionnaireValidationSchema = z.object({
  firstName: z.string().min(2, 'Please enter your first name'),
  lastName: z.string().min(2, 'Please enter your last name '),

  buyInReason: z
    .string()
    .nullable()
    .refine((val) => val !== null, { message: 'Select an option' }),
  vision: z
    .string()
    .nullable()
    .refine((val) => val !== null, { message: 'Select an option' }),
  involvement: z
    .string()
    .nullable()
    .refine((val) => val !== null, { message: 'Select an option' }),

  investmentRangesId: z.number(),
  startDate: z
    .string()
    .optional()
    .nullable()
    .refine((val) => val !== null, { message: 'Select an option' })
});

const initialValues: AddCustomerDto = {
  firstName: '',
  lastName: '',
  buyInReason: '',
  vision: '',
  involvement: '',
  investmentRangesId: 0,
  startDate: ''
};

export const CustomerQuestionnaireForm: React.FC = () => {
  const router = useRouter();

  const [capitals, setCapitals] = useState<SelectOption[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AddCustomerDto>({
    resolver: zodResolver(questionnaireValidationSchema),
    defaultValues: initialValues,
    mode: 'all'
  });

  const onSubmit = async (data: AddCustomerDto) => {
    try {
      const payload: AddCustomerDto = {
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        buyInReason: buyInReasonOptions[Number(data.buyInReason)] ?? '',
        vision: visionOptions[Number(data.vision)] ?? '',
        involvement: involvementOptions[Number(data.involvement)] ?? '',
        startDate: data.startDate ?? '',
        investmentRangesId: Number(data?.investmentRangesId ?? 0)
      };
      const customer = await endpoints.customer.create({ customer: payload });
      toast.success('Submitted!');
      router.push(`/customer/${customer?.id}`);
    } catch (err) {
      toast.error('Failed to submit!');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await endpoints.investmentRange.investmentRangeList();
        setCapitals(
          data.map((item) => ({ label: item.name ?? '', value: item.id })) ?? []
        );
      } catch (_err) {
        setCapitals([]);
      }
    })();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4"
    >
      <ToastContainer />
      <ReactTextInput
        label="First Name"
        name="firstName"
        register={register}
        errors={errors}
        placeholder="Enter First Name"
      />

      <ReactTextInput
        label="Last Name"
        name="lastName"
        register={register}
        errors={errors}
        placeholder="Enter Last Name"
      />

      <SelectInput
        label={`What is your primary reason for buying a franchise?`}
        name="buyInReason"
        register={register}
        errors={errors}
        placeholder="Select an option"
        options={buyInReasonOptions.map((option, i) => ({
          label: option,
          value: i
        }))}
      />

      <SelectInput
        label="Which of the following best describes your long-term vision?"
        name="vision"
        register={register}
        errors={errors}
        placeholder="Select an option"
        options={visionOptions.map((option, i) => ({
          label: option,
          value: i
        }))}
      />

      <SelectInput
        label="How involved will you be in day-to-day operations?"
        name="involvement"
        register={register}
        errors={errors}
        placeholder="Select an option"
        options={involvementOptions.map((option, i) => ({
          label: option,
          value: i
        }))}
      />

      <SelectInput
        label="What is your approximate available liquid capital for investment?"
        name="investmentRangesId"
        register={register}
        errors={errors}
        placeholder="Select an option"
        valueType="number"
        options={capitals}
      />

      <DatePickerInput
        name="startDate"
        label="Start Date"
        placeholder="Start Date"
        register={register}
        errors={errors}
      />

      <div className="flex justify-center items-center mt-5">
        <Button
          color="secondary"
          size="lg"
          type="submit"
          className="text-white bg-blue-700"
          disabled={isSubmitting}
        >
          Generate Report
        </Button>
      </div>
    </form>
  );
};
