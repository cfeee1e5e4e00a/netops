import { FunctionalComponent } from 'preact';
import { Route, Router } from 'preact-router';

import { MainLayout } from '@/layouts/MainLayout';
import { VpnPage } from '@/pages/VpnPage';
import { HomePage } from '@/pages/HomePage';

export const App: FunctionalComponent = () => {
    return (
        <MainLayout>
            <Router>
                <Route path="/" component={() => <HomePage />} />
                <Route path="/vpn" component={() => <VpnPage />} />
            </Router>
        </MainLayout>
    );
};
