import { FunctionalComponent } from 'preact';
import { Route, Router } from 'preact-router';

import { MainLayout } from '@/layouts/MainLayout';
import { VpnPage } from '@/pages/VpnPage';

export const App: FunctionalComponent = () => {
    return (
        <MainLayout>
            <Router>
                <Route path="/vpn" component={VpnPage} />
                <Route path="/" component={() => <h1>Netops</h1>} />
            </Router>
        </MainLayout>
    );
};
