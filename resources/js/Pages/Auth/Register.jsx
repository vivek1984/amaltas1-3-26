import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        mobile: '',
        password: '',
        password_confirmation: '',
    });

    const { url } = usePage();

    // Parse the current URL to extract the 'redirect_to' parameter
    const currentUrl = new URL(window.location.href);
    const redirectToParam = currentUrl.searchParams.get('redirect_to');

    const submit = (e) => {
        e.preventDefault();

        // If a redirect_to parameter exists, append it to the POST request
        // This ensures Laravel's Fortify/Breeze can use it after successful registration
        const postUrl = redirectToParam ? route('register', { redirect_to: redirectToParam }) : route('register');
        post(postUrl, {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const loginLinkHref = redirectToParam
        ? route('login', { redirect_to: redirectToParam })
        : route('login');

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="mobile" value="Mobile No" />

                    <TextInput
                        id="mobile"
                        type="text"
                        name="mobile"
                        value={data.mobile}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('mobile', e.target.value)}
                        required
                    />

                    <InputError message={errors.mobile} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="pincode" value="Pincode" />

                    <TextInput
                        id="pincode"
                        type="number"
                        name="pincode"
                        value={data.pincode}
                        className="mt-1 block w-full"
                        autoComplete="pincode"
                        onChange={(e) => setData('pincode', e.target.value)}
                        required
                    />

                    <InputError message={errors.pincode} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={loginLinkHref}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
