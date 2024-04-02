import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  id: z.number().readonly().nullable().optional(),
  email: z.string().email('Email must be valid'),
  firstName: z.string().min(2, 'First name must be al least 2 characters'),
  lastName: z.string().min(2, 'Last name must be al least 2 characters'),
});

export type UserFormProps = {
  onSubmit: (values: UserFormSchema) => void;
  defaultValues?: UserFormSchema;
  disabled?: boolean;
};

export type UserFormSchema = z.infer<typeof formSchema>;

export const UserForm: FC<UserFormProps> = (props) => {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: props.defaultValues ?? {
      email: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = (values: UserFormSchema) => {
    props.onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {form.getValues('id') && (
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={form.getValues('id') as number}
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button className="mt-4" type="submit" disabled={props.disabled}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
