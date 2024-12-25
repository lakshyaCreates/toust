import { z } from "zod";

const addWebsiteFormSchema = z.object({
    domain: z
        .string()
        .min(4) // Minimum possible valid domain (e.g., "a.io")
        .max(253) // Maximum length per RFC 1035
        .refine(
            (domain) => {
                // Basic format check
                const basicFormat =
                    /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9](\.[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])*\.[a-zA-Z]{2,}$/;
                if (!basicFormat.test(domain)) return false;

                // Check individual label lengths (parts between dots)
                const labels = domain.split(".");
                if (labels.some((label) => label.length > 63)) return false;

                // Ensure TLD is valid (all letters, minimum 2 chars)
                const tld = labels[labels.length - 1];
                if (!/^[a-zA-Z]{2,}$/.test(tld)) return false;

                return true;
            },
            {
                message: "Invalid domain format. Please enter a valid domain",
            },
        ),
    note: z.string().optional(),
});

type AddWebsiteFormSchema = z.infer<typeof addWebsiteFormSchema>;

export { addWebsiteFormSchema, type AddWebsiteFormSchema };
