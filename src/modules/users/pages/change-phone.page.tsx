import { Card, CardContent } from '@/base/components/ui/card';

import { ChangePhoneForm } from '../components/change-phone-form';

export function ChangePhonePage() {
  return (
    <section className="mx-auto my-10 w-lg">
      <Card>
        <CardContent className="flex flex-col gap-6">
          <ChangePhoneForm />
        </CardContent>
      </Card>
    </section>
  );
}
