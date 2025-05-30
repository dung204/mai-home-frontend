import { Card, CardContent } from '@/base/components/ui/card';

import { ChangePasswordForm } from '../components/change-password-form';

export function ChangePasswordPage() {
  return (
    <section className="mx-auto my-10 w-lg">
      <Card>
        <CardContent className="flex flex-col gap-6">
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </section>
  );
}
