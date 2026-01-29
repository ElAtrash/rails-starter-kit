const ERROR_ANIMATION = "animate-in fade-in slide-in-from-top-1";

// Helper to format error messages (handle both string and array)
const formatError = (error: string | string[] | undefined): string => {
  if (!error) return "";
  if (Array.isArray(error)) return error[0];
  return error;
};

// Reusable error message component
export const ErrorMessage = ({
  message,
}: {
  message: string | string[] | undefined;
}) => {
  if (!message) return null;
  const text = formatError(message);
  if (!text) return null;
  return (
    <p className={`text-xs text-destructive ${ERROR_ANIMATION}`}>{text}</p>
  );
};

// Reusable form field component
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

export const FormField = ({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  helperText,
}: {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | string[];
  helperText?: string;
}) => {
  const InputComponent = type === "password" ? PasswordInput : Input;

  return (
    <div className="grid gap-1">
      <InputComponent
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={error ? "border-destructive" : ""}
      />
      {helperText && !error && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
      <ErrorMessage message={error} />
    </div>
  );
};
