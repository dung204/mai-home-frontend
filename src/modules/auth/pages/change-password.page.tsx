import { Card, CardContent } from '@/base/components/ui/card';

import { ChangePasswordForm } from '../components/change-password-form';

export async function ChangePasswordPage() {
  return (
    <section className="container mx-auto lg:max-w-lg!">
      <Card>
        <CardContent className="flex flex-col gap-6">
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </section>
  );
}
