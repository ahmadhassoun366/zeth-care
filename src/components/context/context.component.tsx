import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import queryClient from 'src/shared/query-client';

import DocTitleSvcContext from 'src/shared/services/doc-title/doc-title.context';
import DocumentTitleService from 'src/shared/services/doc-title/doc-title.service';

const titleSvc = new DocumentTitleService();

function AppUISvcs({ children }: { children: ReactNode }) {
	return <DocTitleSvcContext.Provider value={titleSvc}>{children}</DocTitleSvcContext.Provider>;
}

type ContextComponentProps = {
	children: ReactNode;
};

export default function ContextComponent({ children }: ContextComponentProps) {
	return (
		<AppUISvcs>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</AppUISvcs>
	);
}
