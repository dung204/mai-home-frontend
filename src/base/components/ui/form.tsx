'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { InfoIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import * as React from 'react';
import {
  DefaultValues,
  type FieldPath,
  type FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
  useController,
  useForm,
  useFormContext,
  useFormState,
} from 'react-hook-form';
import { MapContainer } from 'react-leaflet';
import { z } from 'zod';

import { Button } from '@/base/components/ui/button';
import { Checkbox } from '@/base/components/ui/checkbox';
import { DatePicker } from '@/base/components/ui/date-picker';
import { DateRangePicker } from '@/base/components/ui/date-range-picker';
import { DateTimePicker } from '@/base/components/ui/date-time-picker';
import { DateTimeRangePicker } from '@/base/components/ui/date-time-range-picker';
import { Input } from '@/base/components/ui/input';
import { Label } from '@/base/components/ui/label';
import { PasswordInput } from '@/base/components/ui/password-input';
import { Select } from '@/base/components/ui/select';
import { Slider } from '@/base/components/ui/slider';
import { Switch } from '@/base/components/ui/switch';
import { Textarea } from '@/base/components/ui/textarea';
import { TimePicker } from '@/base/components/ui/time-picker';
import { TimeRangePicker } from '@/base/components/ui/time-range-picker';
import { cn } from '@/base/lib';
import { withProps } from '@/base/utils';
import { UserAvatarUploader } from '@/modules/users';

import { AsyncSelect, AsyncSelectProps } from './async-select';
import { ImageUploader } from './image-uploader';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './input-otp';
import { VideoUploader } from './video-uploader';

const MapLocationPicker = dynamic(() => import('./map-location-picker'), { ssr: false });

type FormFieldRenderFn<ControlCompProps> = (comps: {
  /**
   * The component that renders the label of the field
   */
  Label: (props: Omit<React.ComponentProps<typeof FormLabel>, 'children'>) => React.ReactElement;
  /**
   * The component that renders the control (input, picker, switch, select, ...) of the field
   */
  Control: (props: ControlCompProps) => React.ReactElement;
  /**
   * The component that renders the description of the field
   */
  Description: (props: React.ComponentProps<typeof FormDescription>) => React.ReactElement;
  /**
   * The component that renders the error/success messages of the field
   */
  Message: (props: React.ComponentProps<typeof FormMessage>) => React.ReactNode;
}) => React.ReactNode;

type FormFieldSpec<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
} & (
  | {
      type: 'text';
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof Input>>;
    }
  | {
      type: 'password';
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof PasswordInput>>;
    }
  | {
      type: 'textarea';
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof Textarea>>;
    }
  | {
      type: 'checkbox';
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof Checkbox>>;
    }
  | {
      type: 'date';
      range?: false;
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof DatePicker>>;
    }
  | {
      type: 'date';
      range: true;
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof DateRangePicker>>;
    }
  | {
      type: 'time';
      range?: false;
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof TimePicker>>;
    }
  | {
      type: 'time';
      range: true;
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof TimeRangePicker>>;
    }
  | {
      type: 'datetime';
      range?: false;
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof DateTimePicker>>;
    }
  | {
      type: 'datetime';
      range: true;
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof DateTimeRangePicker>>;
    }
  | ({
      type: 'select';
      async?: false;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<
        Pick<React.ComponentProps<typeof Select>, 'className' | 'triggerClassName'>
      >;
    } & Omit<React.ComponentProps<typeof Select>, 'value' | 'onChange'>)
  | ({
      type: 'select';
      async: true;
      onChange?: (value: string | string[]) => void;
      render?: FormFieldRenderFn<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Pick<AsyncSelectProps<any>, 'className' | 'triggerClassName'>
      >;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } & Omit<AsyncSelectProps<any>, 'value' | 'onChange'>)
  | {
      type: 'slider';
      step?: number;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof Slider>>;
    }
  | {
      type: 'switch';
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof Switch>>;
    }
  | {
      type: 'otp';
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<{
        inputProps?: Omit<React.ComponentProps<typeof InputOTP>, 'render' | 'maxLength'>;
        groupProps?: React.ComponentProps<typeof InputOTPGroup>;
        slotProps?: Omit<React.ComponentProps<typeof InputOTPSlot>, 'index'>;
      }>;
    }
  | ({
      type: 'map';
      render?: FormFieldRenderFn<{ className?: string }>;
    } & React.ComponentProps<typeof MapContainer>)
  | ({
      type: 'image';
      render?: FormFieldRenderFn<{ className?: string }>;
    } & Omit<React.ComponentProps<typeof ImageUploader>, 'images' | 'onImagesChange'>)
  | ({
      type: 'video';
      render?: FormFieldRenderFn<{ className?: string }>;
    } & Omit<React.ComponentProps<typeof VideoUploader>, 'videos' | 'onVideosChange'>)
  | ({
      type: 'avatar';
      render?: FormFieldRenderFn<{ className?: string }>;
    } & Omit<React.ComponentProps<typeof UserAvatarUploader>, 'image' | 'onImageChange'>)
);

interface FormProps<TFieldValues extends FieldValues, TTransformedValues> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: z.ZodSchema<TTransformedValues, any, TFieldValues>;
  fields: FormFieldSpec<TFieldValues>[];
  onSuccessSubmit: SubmitHandler<TTransformedValues>;
  onErrorSubmit?: SubmitErrorHandler<TFieldValues>;
  defaultValues?: DefaultValues<TFieldValues>;
  renderSubmitButton?: (
    Comp: (
      props: Omit<React.ComponentProps<typeof Button>, 'type' | 'loading' | 'disabled'>,
    ) => React.ReactElement,
  ) => React.ReactNode;
  i18nNamespace?: Parameters<typeof useTranslations>[0];
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: React.Ref<UseFormReturn<TFieldValues, any, TTransformedValues>>;
  loading?: boolean;
}

function Form<TFieldValues extends FieldValues, TTransformedValues>({
  schema,
  fields,
  className,
  ref,
  defaultValues,
  i18nNamespace,
  onSuccessSubmit,
  onErrorSubmit,
  renderSubmitButton,
  loading,
}: FormProps<TFieldValues, TTransformedValues>) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(schema._def.schema ?? schema, defaultValues),
  });
  const t = useTranslations(i18nNamespace);

  const SubmitButton = Button;

  React.useImperativeHandle(ref, () => form, [form]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSuccessSubmit, onErrorSubmit)}
        className={cn('grid gap-4', className)}
      >
        {fields.map((formField) => {
          const Label = FormLabel;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const Control = getFormControl(formField) as any;
          const Description = FormDescription;
          const Message = FormMessage;
          const isFieldRequired = !(
            (schema._def.schema ?? schema).shape[formField.name] instanceof z.ZodOptional
          );

          return (
            <FormField key={formField.name} name={formField.name}>
              <FormItem i18nNamespace={i18nNamespace} className={formField.className}>
                {!formField.render ? (
                  <>
                    <Label required={formField.required ?? isFieldRequired}>
                      {formField.label}
                    </Label>
                    <Control formField={formField} disabled={loading || formField.disabled} />

                    {(t.has(`fields.${formField.name}.description` as Parameters<typeof t>[0]) ||
                      formField.description) && <Description>{formField.description}</Description>}
                    <Message />
                  </>
                ) : (
                  formField.render({
                    Label: withProps(Label, {
                      required: formField.required ?? isFieldRequired,
                      children: formField.label,
                    }),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    Control: withProps(Control as any, {
                      formField,
                      disabled: loading || formField.disabled,
                    }),
                    Description: (props) =>
                      t.has(`fields.${formField.name}.description` as Parameters<typeof t>[0]) ||
                      formField.description ? (
                        <Description {...props}>{formField.description}</Description>
                      ) : (
                        <></>
                      ),
                    Message,
                  })
                )}
              </FormItem>
            </FormField>
          );
        })}
        {!renderSubmitButton ? (
          <SubmitButton type="submit" loading={loading}>
            Submit
          </SubmitButton>
        ) : (
          renderSubmitButton(withProps(SubmitButton, { type: 'submit', loading }))
        )}
      </form>
    </FormProvider>
  );
}

function getFormControl(formField: FormFieldSpec) {
  switch (formField.type) {
    case 'text':
      return TextFormControl;

    case 'password':
      return PasswordFormControl;

    case 'textarea':
      return TextareaFormControl;

    case 'checkbox':
      return CheckboxFormControl;

    case 'date':
      if (formField.range) {
        return DateRangeFormControl;
      }

      return DateFormControl;

    case 'time':
      if (formField.range) {
        return TimeRangeFormControl;
      }

      return TimeFormControl;

    case 'datetime':
      if (formField.range) {
        return DateTimeRangeFormControl;
      }

      return DateTimeFormControl;

    case 'select':
      if (formField.async) {
        return AsyncSelectFormControl;
      }

      return SelectFormControl;

    case 'slider':
      return SliderFormControl;

    case 'switch':
      return SwitchFormControl;

    case 'otp':
      return OTPFormControl;

    case 'map':
      return MapFormControl;

    case 'image':
      return ImageFormControl;

    case 'video':
      return VideoFormControl;

    case 'avatar':
      return UserAvatarFormControl;
  }
}

function TextFormControl({
  formField,
  ...props
}: React.ComponentProps<typeof Input> & { formField: Extract<FormFieldSpec, { type: 'text' }> }) {
  const form = useFormContext();
  const { i18nNamespace } = useFormField();
  const t = useTranslations(i18nNamespace);

  return (
    <FormControl>
      <Input
        placeholder={
          formField.placeholder ??
          t(`fields.${formField.name}.placeholder` as Parameters<typeof t>[0])
        }
        {...form.register(formField.name)}
        {...props}
      />
    </FormControl>
  );
}

function PasswordFormControl({
  formField,
  ...props
}: React.ComponentProps<typeof PasswordInput> & {
  formField: Extract<FormFieldSpec, { type: 'password' }>;
}) {
  const form = useFormContext();
  const { i18nNamespace } = useFormField();
  const t = useTranslations(i18nNamespace);

  return (
    <FormControl>
      <PasswordInput
        placeholder={
          formField.placeholder ??
          t(`fields.${formField.name}.placeholder` as Parameters<typeof t>[0])
        }
        {...form.register(formField.name)}
        {...props}
      />
    </FormControl>
  );
}

function TextareaFormControl({
  formField,
  ...props
}: React.ComponentProps<typeof Textarea> & {
  formField: Extract<FormFieldSpec, { type: 'textarea' }>;
}) {
  const form = useFormContext();
  const { i18nNamespace } = useFormField();
  const t = useTranslations(i18nNamespace);

  return (
    <FormControl>
      <Textarea
        placeholder={
          formField.placeholder ??
          t(`fields.${formField.name}.placeholder` as Parameters<typeof t>[0])
        }
        {...form.register(formField.name)}
        {...props}
      />
    </FormControl>
  );
}

function CheckboxFormControl({
  formField,
  ...props
}: React.ComponentProps<typeof Checkbox> & {
  formField: Extract<FormFieldSpec, { type: 'checkbox' }>;
}) {
  const form = useFormContext();

  return (
    <FormControl>
      <Checkbox
        checked={form.getValues(formField.name)}
        onChange={(checked) =>
          form.setValue(formField.name, checked, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        {...props}
      />
    </FormControl>
  );
}

function DateRangeFormControl({
  formField,
  triggerClassName,
  ...props
}: React.ComponentProps<typeof DateRangePicker> & {
  formField: Extract<FormFieldSpec, { type: 'date'; range: true }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();
  const t = useTranslations(i18nNamespace);

  return (
    <FormControl>
      <DateRangePicker
        dateRange={form.getValues(formField.name)}
        onDateRangeChange={(dateRange) =>
          form.setValue(formField.name, dateRange, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        disabled={formField.disabled}
        placeholder={
          formField.placeholder ??
          t(`fields.${formField.name}.placeholder` as Parameters<typeof t>[0])
        }
        triggerClassName={cn(
          { 'ring-danger/20! dark:ring-danger/40! border-danger!': !!error },
          triggerClassName,
        )}
        {...props}
      />
    </FormControl>
  );
}

function DateFormControl({
  formField,
  triggerClassName,
  ...props
}: React.ComponentProps<typeof DatePicker> & {
  formField: Extract<FormFieldSpec, { type: 'date' }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();
  const t = useTranslations(i18nNamespace);

  return (
    <FormControl>
      <DatePicker
        date={form.getValues(formField.name)}
        onDateChange={(date) =>
          form.setValue(formField.name, date, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        disabled={formField.disabled}
        placeholder={
          formField.placeholder ??
          t(`fields.${formField.name}.placeholder` as Parameters<typeof t>[0])
        }
        triggerClassName={cn(
          { 'ring-danger/20! dark:ring-danger/40! border-danger!': !!error },
          triggerClassName,
        )}
        {...props}
      />
    </FormControl>
  );
}

function TimeRangeFormControl({
  formField,
  triggerClassName,
  ...props
}: React.ComponentProps<typeof TimeRangePicker> & {
  formField: Extract<FormFieldSpec, { type: 'time'; range: true }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();
  const t = useTranslations(i18nNamespace);

  return (
    <FormControl>
      <TimeRangePicker
        dateRange={form.getValues(formField.name)}
        onDateRangeChange={(dateRange) =>
          form.setValue(formField.name, dateRange, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        disabled={formField.disabled}
        placeholder={
          formField.placeholder ??
          t(`fields.${formField.name}.placeholder` as Parameters<typeof t>[0])
        }
        triggerClassName={cn(
          { 'ring-danger/20! dark:ring-danger/40! border-danger!': !!error },
          triggerClassName,
        )}
        {...props}
      />
    </FormControl>
  );
}

function TimeFormControl({
  formField,
  triggerClassName,
  ...props
}: React.ComponentProps<typeof TimePicker> & {
  formField: Extract<FormFieldSpec, { type: 'time' }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();
  const t = useTranslations(i18nNamespace);

  return (
    <FormControl>
      <TimePicker
        date={form.getValues(formField.name)}
        onDateChange={(date) =>
          form.setValue(formField.name, date, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        disabled={formField.disabled}
        placeholder={
          formField.placeholder ??
          t(`fields.${formField.name}.placeholder` as Parameters<typeof t>[0])
        }
        triggerClassName={cn(
          { 'ring-danger/20! dark:ring-danger/40! border-danger!': !!error },
          triggerClassName,
        )}
        {...props}
      />
    </FormControl>
  );
}

function DateTimeRangeFormControl({
  formField,
  triggerClassName,
  ...props
}: React.ComponentProps<typeof DateTimeRangePicker> & {
  formField: Extract<FormFieldSpec, { type: 'datetime'; range: true }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();
  const t = useTranslations(i18nNamespace);

  return (
    <FormControl>
      <DateTimeRangePicker
        dateRange={form.getValues(formField.name)}
        onDateRangeChange={(dateRange) =>
          form.setValue(formField.name, dateRange, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        disabled={formField.disabled}
        placeholder={
          formField.placeholder ??
          t(`fields.${formField.name}.placeholder` as Parameters<typeof t>[0])
        }
        triggerClassName={cn(
          { 'ring-danger/20! dark:ring-danger/40! border-danger!': !!error },
          triggerClassName,
        )}
        {...props}
      />
    </FormControl>
  );
}

function DateTimeFormControl({
  formField,
  triggerClassName,
  ...props
}: Omit<React.ComponentProps<typeof DateTimePicker>, 'date' | 'onDateChange'> & {
  formField: Extract<FormFieldSpec, { type: 'datetime' }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();
  const t = useTranslations(i18nNamespace);

  return (
    <FormControl>
      <DateTimePicker
        date={form.getValues(formField.name)}
        onDateChange={(date) =>
          form.setValue(formField.name, date, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        disabled={formField.disabled}
        placeholder={
          formField.placeholder ??
          t(`fields.${formField.name}.placeholder` as Parameters<typeof t>[0])
        }
        triggerClassName={cn(
          { 'ring-danger/20! dark:ring-danger/40! border-danger!': !!error },
          triggerClassName,
        )}
        {...props}
      />
    </FormControl>
  );
}

function AsyncSelectFormControl({
  formField,
  triggerClassName,
  ...props
}: Omit<React.ComponentProps<typeof AsyncSelect>, 'value' | 'onChange'> & {
  formField: Extract<FormFieldSpec, { type: 'select'; async: true }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();
  const t = useTranslations(i18nNamespace);

  return (
    <AsyncSelect
      {...formField}
      value={form.getValues(formField.name)}
      onChange={(value: string | string[]) => {
        form.setValue(formField.name, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
        formField.onChange?.(value);
      }}
      placeholder={
        formField.placeholder ??
        t(`fields.${formField.name}.placeholder` as Parameters<typeof t>[0])
      }
      triggerClassName={cn(
        {
          'ring-danger/20! dark:ring-danger/40! border-danger!': !!error,
        },
        triggerClassName,
      )}
      {...props}
    />
  );
}

function SelectFormControl({
  formField,
  triggerClassName,
  ...props
}: Omit<React.ComponentProps<typeof Select>, 'options' | 'multiple' | 'value' | 'onChange'> & {
  formField: Extract<FormFieldSpec, { type: 'select'; async?: false }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();
  const t = useTranslations(i18nNamespace);

  return (
    <Select
      {...formField}
      value={form.getValues(formField.name)}
      onChange={(value: string | string[]) =>
        form.setValue(formField.name, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        })
      }
      placeholder={
        formField.placeholder ??
        t(`fields.${formField.name}.placeholder` as Parameters<typeof t>[0])
      }
      triggerClassName={cn(
        {
          'ring-danger/20! dark:ring-danger/40! border-danger!': !!error,
        },
        triggerClassName,
      )}
      {...props}
    />
  );
}

function SliderFormControl({
  formField,
  ...props
}: React.ComponentProps<typeof Slider> & {
  formField: Extract<FormFieldSpec, { type: 'slider' }>;
}) {
  const form = useFormContext();

  return (
    <FormControl>
      <Slider
        value={form.getValues(formField.name)}
        onValueChange={([value]) =>
          form.setValue(formField.name, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        {...props}
      />
    </FormControl>
  );
}

function SwitchFormControl({
  formField,
  ...props
}: React.ComponentProps<typeof Switch> & {
  formField: Extract<FormFieldSpec, { type: 'switch' }>;
}) {
  const form = useFormContext();

  return (
    <FormControl>
      <Switch
        disabled={formField.disabled}
        checked={form.getValues(formField.name)}
        onCheckedChange={(check) =>
          form.setValue(formField.name, check, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        {...props}
      />
    </FormControl>
  );
}

function OTPFormControl({
  formField,
  inputProps = {},
  groupProps = {},
  slotProps = {},
}: {
  inputProps?: Omit<React.ComponentProps<typeof InputOTP>, 'render' | 'maxLength'>;
  groupProps?: React.ComponentProps<typeof InputOTPGroup>;
  slotProps?: Omit<React.ComponentProps<typeof InputOTPSlot>, 'index'>;
  formField: Extract<FormFieldSpec, { type: 'otp' }>;
}) {
  const form = useFormContext();
  const { className: inputClassName, ...otherInputProps } = inputProps;
  const { className: groupClassName, ...otherGroupProps } = groupProps;
  const { className: slotClassName, ...otherSlotProps } = slotProps;

  return (
    <FormControl>
      <InputOTP
        {...form.register(formField.name)}
        onChange={(value) =>
          form.setValue(formField.name, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        maxLength={6}
        className={inputClassName}
        {...otherInputProps}
      >
        <InputOTPGroup className={cn('aspect-square grow', groupClassName)} {...otherGroupProps}>
          <InputOTPSlot index={0} className={cn('size-full', slotClassName)} {...otherSlotProps} />
        </InputOTPGroup>
        <InputOTPGroup className={cn('aspect-square grow', groupClassName)} {...otherGroupProps}>
          <InputOTPSlot index={1} className={cn('size-full', slotClassName)} {...otherSlotProps} />
        </InputOTPGroup>
        <InputOTPGroup className={cn('aspect-square grow', groupClassName)} {...otherGroupProps}>
          <InputOTPSlot index={2} className={cn('size-full', slotClassName)} {...otherSlotProps} />
        </InputOTPGroup>
        <InputOTPGroup className={cn('aspect-square grow', groupClassName)} {...otherGroupProps}>
          <InputOTPSlot index={3} className={cn('size-full', slotClassName)} {...otherSlotProps} />
        </InputOTPGroup>
        <InputOTPGroup className={cn('aspect-square grow', groupClassName)} {...otherGroupProps}>
          <InputOTPSlot index={4} className={cn('size-full', slotClassName)} {...otherSlotProps} />
        </InputOTPGroup>
        <InputOTPGroup className={cn('aspect-square grow', groupClassName)} {...otherGroupProps}>
          <InputOTPSlot index={5} className={cn('size-full', slotClassName)} {...otherSlotProps} />
        </InputOTPGroup>
      </InputOTP>
    </FormControl>
  );
}

function MapFormControl({
  formField,
  ...props
}: React.ComponentProps<typeof MapContainer> & {
  formField: Extract<FormFieldSpec, { type: 'map' }>;
}) {
  const form = useFormContext();
  const {
    field: { value: position, onChange },
  } = useController({
    control: form.control,
    name: formField.name,
  });

  return (
    <MapLocationPicker {...formField} {...props} position={position} onPositionChange={onChange} />
  );
}

function ImageFormControl({
  formField,
  className,
}: {
  className?: string;
  formField: Extract<FormFieldSpec, { type: 'image' }>;
}) {
  const form = useFormContext();
  const {
    field: { value: images, onChange },
  } = useController({
    control: form.control,
    name: formField.name,
  });

  return (
    <ImageUploader
      className={className}
      images={images}
      indexesToDelete={formField.indexesToDelete}
      onImagesChange={onChange}
      onIndexesToDeleteChange={formField.onIndexesToDeleteChange}
    />
  );
}

function VideoFormControl({
  className,
  formField,
}: {
  className?: string;
  formField: Extract<FormFieldSpec, { type: 'video' }>;
}) {
  const form = useFormContext();
  const {
    field: { value: videos, onChange },
  } = useController({
    control: form.control,
    name: formField.name,
  });

  return (
    <VideoUploader
      className={className}
      videos={videos}
      indexesToDelete={formField.indexesToDelete}
      onVideosChange={onChange}
      onIndexesToDeleteChange={formField.onIndexesToDeleteChange}
    />
  );
}

function UserAvatarFormControl({
  className,
  formField,
}: {
  className?: string;
  formField: Extract<FormFieldSpec, { type: 'avatar' }>;
}) {
  const form = useFormContext();
  const {
    field: { value: image, onChange },
  } = useController({
    control: form.control,
    name: formField.name,
  });

  return (
    <UserAvatarUploader
      user={formField.user}
      className={className}
      image={image}
      onImageChange={onChange}
    />
  );
}

function getDefaultValues<TFieldValues extends FieldValues, TTransformedValues>(
  schema: z.ZodObject<z.ZodRawShape, 'strip', z.ZodTypeAny, TTransformedValues, TFieldValues>,
  defaultValues?: DefaultValues<TFieldValues>,
) {
  const zodDefaults = Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault) {
        return [key, value._def.defaultValue()];
      }

      if (value instanceof z.ZodString) {
        return [key, ''];
      }

      if (value instanceof z.ZodBoolean) {
        return [key, false];
      }

      if (value instanceof z.ZodArray) {
        return [key, []];
      }

      return [key, undefined];
    }),
  );

  return {
    ...zodDefaults,
    ...defaultValues,
  } as DefaultValues<TFieldValues>;
}

type InternalFormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const InternalFormFieldContext = React.createContext<InternalFormFieldContextValue>(
  {} as InternalFormFieldContextValue,
);

type InternalFormFieldProps<TFieldValues extends FieldValues = FieldValues> =
  React.PropsWithChildren<{
    name: FieldPath<TFieldValues>;
  }>;

function FormField<TFieldValues extends FieldValues = FieldValues>({
  name,
  children,
}: InternalFormFieldProps<TFieldValues>) {
  return (
    <InternalFormFieldContext.Provider value={{ name }}>
      {children}
    </InternalFormFieldContext.Provider>
  );
}

const useFormField = () => {
  const fieldContext = React.useContext(InternalFormFieldContext);
  const itemContext = React.useContext(InternalFormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    i18nNamespace: itemContext.i18nNamespace,
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type InternalFormItemContextValue = {
  id: string;
  i18nNamespace?: Parameters<typeof useTranslations>[0];
};

const InternalFormItemContext = React.createContext<InternalFormItemContextValue>(
  {} as InternalFormItemContextValue,
);

function FormItem({
  className,
  i18nNamespace,
  ...props
}: React.ComponentProps<'div'> & { i18nNamespace?: Parameters<typeof useTranslations>[0] }) {
  const id = React.useId();

  return (
    <InternalFormItemContext.Provider value={{ id, i18nNamespace }}>
      <div data-slot="form-item" className={cn('grid gap-2', className)} {...props} />
    </InternalFormItemContext.Provider>
  );
}

function FormLabel({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { required?: boolean }) {
  const { error, formItemId, i18nNamespace, name } = useFormField();
  const t = useTranslations(i18nNamespace);

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn('data-[error=true]:text-danger', className)}
      htmlFor={formItemId}
      {...props}
    >
      {children ?? t(`fields.${name}.label` as Parameters<typeof t>[0])}
      {required && (
        <span className="text-danger" aria-hidden>
          *
        </span>
      )}
    </Label>
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, children, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId, i18nNamespace, name } = useFormField();
  const t = useTranslations(i18nNamespace);

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    >
      {children ?? t(`fields.${name}.description` as Parameters<typeof t>[0])}
    </p>
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId, name, i18nNamespace } = useFormField();
  const t = useTranslations(i18nNamespace);

  const body = error
    ? t.has(`fields.${name}.errors.${error.type}` as Parameters<typeof t>[0])
      ? t(`fields.${name}.errors.${error.type}` as Parameters<typeof t>[0])
      : error.message
    : props.children;

  if (!body) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <InfoIcon className="text-danger size-4" />
      <p
        data-slot="form-message"
        id={formMessageId}
        className={cn('text-danger text-sm', className)}
        {...props}
      >
        {body}
      </p>
    </div>
  );
}

export {
  useFormField,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};
