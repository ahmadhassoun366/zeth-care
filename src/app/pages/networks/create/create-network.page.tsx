// third party
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// services
// import UserSvcContext from 'src/shared/services/user/user.context';
import AuthSvcContext from '../../../../shared/services/auth/auth.context';
import ModalSvcContext from '../../../../shared/services/modal/modal.context';

// context
import {
	CreateNetworkForm,
	CreateNetworkPageCtx,
	CreateNetworkPageCtxType,
} from './create-network.context';
import CreateNetworkView from './create-network.view';

// shared
// static
import styles from './create-l1.module.css';
import APP_MODALS from '../../../../static/enums/app.modals';
import { useQuery } from 'react-query';
import QueryApi from 'src/shared/api/query-api';
import QUERY_KEYS from 'src/static/query.keys';

// Esquema de validación con Zod

const InitialSupplySchema = z.object({
	address: z.string().min(1, 'Address is required'),
	amount: z
		.string()
		.nullable()
		.transform((val) => (val ? Number(val) : null)) // Convierte string a number
		.refine((val) => val !== null, { message: 'Amount is required' }) // No deja pasar null
		.refine((val) => val! > 0, { message: 'Amount must be greater than 0' }), // No permite negativos ni 0
});

const schema = z.object({
	network_name: z.string().min(1, 'Network name is required'),
	currency_name: z.string().min(1, 'Currency name is required'),
	currency_symbol: z
		.string()
		.min(1, 'Currency symbol is required')
		.max(5, 'Currency symbol must be 5 characters or less'),
	chain_id: z.string().min(1, 'Chain ID is required'),

	// Validación estricta del archivo
	network_image: z
		.instanceof(File)
		.nullable()
		.refine((file) => file instanceof File, { message: 'A file is required' }),

	// // vm_type no tiene valor por defecto, pero es obligatorio antes de enviar
	vm_type: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: 'You must select a network type',
		}),

	gas_price: z
		.string()
		.nullable() // 🔥 Permite que inicie vacío
		.transform((val) => (val ? Number(val) : null)) // 🔥 Convierte string a number o null
		.refine((val) => val !== null, { message: 'Gas price is required' }) // 🔥 No deja pasar si es null
		.refine((val) => val! > 0, { message: 'Gas price must be a positive number' }), // 🔥 Debe ser positivo

	foundation_address: z
		.string()
		.min(1, 'Foundation address is required')
		.regex(/^0x[a-fA-F0-9]{40}$/g, 'Invalid address'),
	gas_price_manager_address: z
		.string()
		.min(1, 'Gas price manager address is required')
		.regex(/^0x[a-fA-F0-9]{40}$/g, 'Invalid address'),
	automation_revenue_address: z
		.string()
		.min(1, 'Automation revenue address is required')
		.regex(/^0x[a-fA-F0-9]{40}$/g, 'Invalid address'),

	// // Lista de Bridges (puede ser vacía pero debe contener URLs válidas si hay datos)
	initial_supply: z.array(InitialSupplySchema).min(1, 'At least one initial supply is required'),

	// Checkbox de términos, empieza en false pero es obligatorio antes de enviar
	accept_terms: z.boolean().refine((val) => val === true, {
		message: 'You must accept the terms',
	}),
});
function PageLogic({ children }: { children: React.ReactNode }) {
	// #region dependencies

	const authSvc = useContext(AuthSvcContext);
	// const userSvc = useContext(UserSvcContext);
	const modalSvc = useContext(ModalSvcContext);

	// #endregion

	const form = useForm<CreateNetworkForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			network_name: '',
			currency_name: '',
			currency_symbol: '',
			network_image: undefined,
			chain_id: '',

			vm_type: undefined,
			gas_price: '',

			foundation_address: '',
			gas_price_manager_address: '',
			automation_revenue_address: '',

			initial_supply: [
				{
					address: '',
					amount: undefined,
				},
			],

			accept_terms: false,
		},
		mode: 'all',
	});

	const initialSupplyArray = useFieldArray({
		control: form.control,
		name: 'initial_supply',
	});

	async function manuHandleSubmit() {
		const dto = {
			network_name: form.getValues('network_name'),
			currency_name: form.getValues('currency_name'),
			currency_symbol: form.getValues('currency_symbol'),
			chain_id: form.getValues('chain_id'),
			network_image: form.getValues('network_image'),
			vm_type: form.getValues('vm_type') as 'EVM' | 'SOLANA',
			gas_price: form.getValues('gas_price'),
			foundation_address: form.getValues('foundation_address'),
			gas_price_address: form.getValues('gas_price_manager_address'),
			automation_revenue_address: form.getValues('automation_revenue_address'),
			bridges: [],
			initial_supply: [],
		};

		// validate all fields
		const isValid = await form.trigger();

		console.log('isValid', isValid);

		if (!isValid) {
			return;
		}

		if (!authSvc.isLoggedIn()) {
			modalSvc.open(APP_MODALS.LOGIN_MODAL, null);
			return;
		}

		modalSvc.open(APP_MODALS.DEPLOYMENT_IN_PROGRESS_MODAL, null);

		try {
			// send request
			const res = await QueryApi.networks.createNetwork(dto);
			console.log(res);
			setTimeout(() => {
				const customEvent = new CustomEvent('deploymentsuccess');

				document.dispatchEvent(customEvent);
			}, 5000);
		} catch (err) {
			console.log(err);

			const customEvent = new CustomEvent('deploymenterror', { detail: err });
			document.dispatchEvent(customEvent);
		}
	}

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === 'l') {
				console.log('errors', form.formState.errors);
			}
		}

		document.addEventListener('keydown', onKey);

		return () => {
			document.removeEventListener('keydown', onKey);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// #endregion

	// #region http reqs

	// #endregion

	// #region sidebar

	const [activeSection, setActiveSection] = useState<number>(0);
	const link_group = [
		{
			title: 'Launch New',
			links: [
				{
					name: 'L1 Details',
					onClick: () => {
						window.location.href = '#network.basic-info';
					},
				},
				{
					name: 'VM Type',
					onClick: () => {
						window.location.href = '#network.vm-type';
					},
				},
				{
					name: 'Gas Price',
					onClick: () => {
						window.location.href = '#network.gas-price';
					},
				},
				// {
				// 	name: 'Bridges',
				// 	onClick: () => {
				// 		window.location.href = '#network.bridges';
				// 	},
				// },
				{
					name: 'Initial Supply',
					onClick: () => {
						window.location.href = '#network.initial-supply';
					},
				},
				// {
				// 	name: 'Fund Wrapper Node',
				// 	onClick: () => {
				// 		window.location.href = '#network.wrapper-node';
				// 	},
				// },
			],
		},
	];

	const refs = useRef<Array<HTMLFieldSetElement | null>>([]);

	useLayoutEffect(() => {
		const sec1 = document.getElementById('network.basic-info')!;
		const sec2 = document.getElementById('network.vm-type')!;
		const sec3 = document.getElementById('network.gas-price')!;
		// const sec4 = document.getElementById('network.bridges')!;
		const sec4 = document.getElementById('network.initial-supply')!;
		// const sec6 = document.getElementById('network.wrapper-node')!;

		const secs = [sec1, sec2, sec3, sec4];

		window.addEventListener('scroll', navHighlighter);

		function navHighlighter() {
			// Get current scroll position
			const scrollY = window.scrollY;

			// Now we loop through sections to get height, top and ID values for each
			secs.forEach((current) => {
				const sectionHeight = current.offsetHeight;
				const sectionTop = current.offsetTop - 125;

				/*
						- If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
						- To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
					*/
				if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
					setActiveSection(secs.indexOf(current));
				}
			});
		}

		return () => {
			window.removeEventListener('scroll', navHighlighter);
		};
	}, []);

	// #endregion

	// *~~~ scroll hanlders ~~~* //
	// #region effects
	useEffect(() => {
		document.querySelector('html')!.classList.add(styles.scroll_offset_top);

		return () => {
			document.querySelector('html')!.classList.remove(styles.scroll_offset_top);
		};
	}, []);

	const checkNetworkName = useQuery([QUERY_KEYS.createL1.networkName], () =>
		QueryApi.networks.checkNetworkName(form.getValues('network_name'))
	);

	// for the currency symbol
	const currencySymbolQuery = useQuery([QUERY_KEYS.createL1.currencySymbolQuery], () =>
		QueryApi.networks.checkCurrencySymbol(form.getValues('currency_symbol'))
	);

	// for the currency name
	const currencyNameQuery = useQuery([QUERY_KEYS.createL1.currencyNameQuery], () =>
		QueryApi.networks.checkCurrencyName(form.getValues('currency_name'))
	);

	// for the chain id
	const chainIdQuery = useQuery([QUERY_KEYS.createL1.chainId], () =>
		QueryApi.networks.checkChainId(form.getValues('chain_id'))
	);

	const ctxObject: CreateNetworkPageCtxType = {
		form,

		state: {
			activeSection,
			link_group,
			initialSupplyArray,
		},
		queries: {
			currencySymbolQuery,
			currencyNameQuery,
			chainIdQuery,
			checkNetworkName,
		},

		fn: {
			manuHandleSubmit,
		},

		refs: {
			sectionRefs: refs,
		},
	};

	return (
		<CreateNetworkPageCtx.Provider value={ctxObject}>{children}</CreateNetworkPageCtx.Provider>
	);
}

export default function CreateNetworkPage() {
	return (
		<PageLogic>
			<CreateNetworkView />
		</PageLogic>
	);
}
