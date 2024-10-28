<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'CKEditor 5: Icons Plugin',
    'description' => 'Adds an icon dropdown to CKEditor in TYPO3.',
    'version' => '0.2.5',
    'state' => 'stable',
    'category' => 'be',
    'author' => 'Amadeus Kiener',
    'author_email' => 'amd.kiener@gmail.com',
    'constraints' => [
        'depends' => [
            'typo3' => '12.4.0-13.9.99',
            'rte_ckeditor' => '12.4.0-13.9.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
];