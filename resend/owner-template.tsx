import * as React from "react";

interface RequestBookEmailTemplate {
  firstName: string;
}

export const RequestBookEmailTemplate: React.FC<
  Readonly<RequestBookEmailTemplate>
> = ({ firstName }): React.ReactNode => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
